import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";
import { useState, useEffect } from "react";
import { ButtonApply, ButtonCancel } from "@/components/ButtonStyle";
import { useNavigate, useLocation } from "react-router-dom";

function FilterProduct() {
  const [brand, setBrand] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const parseQueryParams = (queryString: any) => {
    const params = new URLSearchParams(queryString);
    const brands = params.get("brand") ? params.get("brand")?.split(",") : [];
    const prices = params.get("price") ? params.get("price")?.split(",") : [];
    return { brands, prices };
  };

  useEffect(() => {
    const { brands, prices } = parseQueryParams(location.search);
    setBrand(brands);
    setPriceRange(prices);
  }, [location.search]);

  const onBrandsChange: CheckboxProps["onChange"] = (e) => {
    console.log(e.target.checked);
    let _brands = [...brand];
    if (e.target.checked) {
      _brands.push(e.target.value);
    } else {
      _brands = _brands.filter((b) => b !== e.target.value);
    }
    setBrand(_brands);
  };

  const onPriceRangeChange: CheckboxProps["onChange"] = (e) => {
    let _priceRange = [...priceRange];
    console.log(e.target.checked);
    if (e.target.checked) {
      _priceRange.push(e.target.value);
    } else {
      _priceRange = _priceRange.filter((p) => p !== e.target.value);
    }
    setPriceRange(_priceRange);
  };

  const handleFilter = () => {
    let param = "";
    if (brand.length) {
      param += `?brand=${brand.join("%2C")}`;
    }
    if (priceRange.length) {
      param += (param ? "&" : "?") + `price=${priceRange.join("%2C")}`;
    }
    navigate(`/${param}`);
  };

  const handleClearFilter = () => {
    navigate(`/`);
    setBrand([]);
    setPriceRange([]);
  };

  return (
    <div className="border border-gray-300 w-52 rounded-lg flex flex-col gap-y-2 p-2 h-fit">
      <div>
        <p>Thương hiệu</p>
        <div className="flex">
          <Checkbox
            onChange={onBrandsChange}
            checked={brand.includes("samsung")}
            name="samsung"
            value="samsung"
            id="brand1"
          >
            Samsung
          </Checkbox>
        </div>
        <div className="flex">
          <Checkbox
            onChange={onBrandsChange}
            checked={brand.includes("apple")}
            name="apple"
            value="apple"
            id="brand2"
          >
            Apple
          </Checkbox>
        </div>
        <div className="flex">
          <Checkbox
            onChange={onBrandsChange}
            checked={brand.includes("xoami")}
            name="xoami"
            value="xoami"
            id="brand3"
          >
            Xoami
          </Checkbox>
        </div>
      </div>
      <div>
        <p>Giá</p>
        <div className="flex">
          <Checkbox
            onChange={onPriceRangeChange}
            checked={priceRange.includes("0-50")}
            name="0-50"
            value="0-50"
            id="price1"
          >
            0-50$
          </Checkbox>
        </div>
        <div className="flex">
          <Checkbox
            onChange={onPriceRangeChange}
            checked={priceRange.includes("50-100")}
            name="50-100"
            value="50-100"
            id="price2"
          >
            50-100$
          </Checkbox>
        </div>
        <div className="flex">
          <Checkbox
            onChange={onPriceRangeChange}
            checked={priceRange.includes("100-200")}
            name="100-200"
            value="100-200"
            id="price3"
          >
            100-200$
          </Checkbox>
        </div>
      </div>
      <div className="flex mt-3 justify-between">
        <button className={ButtonApply} onClick={handleFilter}>
          Áp dụng
        </button>
        <button className={ButtonCancel} onClick={() => handleClearFilter()}>
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
}

export default FilterProduct;
