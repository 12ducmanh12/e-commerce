import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useDispatch } from "react-redux";
import { productDelete } from "@/context/productsSlice";
// import { useState } from "react";
interface propsType {
  confirmDelete: boolean;
  setConfirmDelete: any;
  deleteProduct: any;
}

function PopupConfirmDelete({
  confirmDelete,
  setConfirmDelete,
  deleteProduct,
}: propsType) {
  const dispatch = useDispatch();
  const footerContent = (
    <div className="flex justify-around">
      <Button
        label="Xóa"
        icon="pi pi-trash"
        onClick={() => {
          setConfirmDelete(false);
          handeleDelete();
        }}
        autoFocus
      />
      <Button
        label="Hủy"
        icon="pi pi-times-circle"
        onClick={() => {
          setConfirmDelete(false);
        }}
        autoFocus
      />
    </div>
  );
  const handeleDelete = () => {
    dispatch(productDelete({ _id: deleteProduct }));
  };
  return (
    <div>
      <Dialog
        visible={confirmDelete}
        modal
        onHide={() => setConfirmDelete(false)}
        footer={footerContent}
        header={null}
      >
        <div>Bạn có chắc chắn xóa?</div>
      </Dialog>
    </div>
  );
}

export default PopupConfirmDelete;
