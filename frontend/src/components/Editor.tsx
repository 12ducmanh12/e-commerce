
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ClassicEditorComponent = ({ setLongDesc }: any) => {
  const handleChange = (event: any, editor: any) => {
    setLongDesc(editor.getData());
  };

  return (
    <>
      <div>
        <p>Long description</p>
        <CKEditor
          editor={ClassicEditor}
          data=""
          config={{ckfinder: {
            // Upload the images to the server using the CKFinder QuickUpload command
            // You have to change this address to your server that has the ckfinder php connector
            uploadUrl: 'https://upload-request.cloudinary.com/manhtd/d5c3fc21391d5a6da1f62005fce223a0'
        }}}
          onChange={(event, editor) => {
            handleChange(event, editor);
          }}
        />
      </div>

    </>
  );
};

export default ClassicEditorComponent;
