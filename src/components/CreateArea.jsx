import React from "react";

function CreateArea(props) {
   const [title, setTitle] = React.useState("");
   const [content, setContent] = React.useState("");

   const handleTitle = (e) => {
      setTitle(e.target.value);
      console.log(title);
   };

   const handleContent = (e) => {
      setContent(e.target.value);
      console.log(content);
   };

   return (
      <div>
         <form className="dash">
            <input
               name="title"
               placeholder="Title"
               onChange={handleTitle}
               value={title}
            />
            <textarea
               name="content"
               placeholder="Take a note..."
               rows="3"
               onChange={handleContent}
               value={content}
            />
            <button
               
               onClick={() => {
                  // eslint-disable-next-line no-restricted-globals
                  props.adding(event,title, content);
                  setTitle("");
                  setContent("");
               }}
            >
               Add
            </button>
         </form>
      </div>
   );
}

export default CreateArea;
