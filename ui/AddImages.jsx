import React, { useState, Fragment, useRef } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Dialog, Transition } from "@headlessui/react";
import { EndPoints } from "../components/api/EndPoints";

const AddImages = ({
  onChange,
  prevImagesURL,
  setPrevImageUrl,
  maxget,
  setErrorMessage,
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [croppingImage, setCroppingImage] = useState(null);
  const [openCropModal, setOpenCropModal] = useState(false);
  const cropperRef = useRef(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    const totalSelected = selectedImages.length + filesArray.length;
    if (totalSelected > 15) {
      if (setErrorMessage) {
        setErrorMessage("Maximum selection limit reached (15 images)");
      }
      if (maxget) {
        maxget(true);
      } else {
        maxget(false);
      }
      return;
    }
    if (filesArray.length > 0) {
      setCroppingImage(filesArray[0]);
      setOpenCropModal(true);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleRemoveImage = (indexToRemove) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handlePrevImageRemove = (idToRemove) => {
    setPrevImageUrl((prevImagesURL) =>
      prevImagesURL.filter((item) => item.id !== idToRemove)
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId == destination.droppableId) {
      if (source.droppableId == "newImages") {
        const items = Array.from(selectedImages);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setSelectedImages(items);
      } else if (source.droppableId == "prevImages") {
        const items = Array.from(prevImagesURL);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setPrevImageUrl(items);
      }
    }
  };

  const handleCropSave = () => {
    const cropper = cropperRef.current.cropper;
    cropper.getCroppedCanvas().toBlob((blob) => {
      const croppedImage = new File([blob], croppingImage.name, {
        type: croppingImage.type,
      });
      setSelectedImages((prevImages) => [...prevImages, croppedImage]);
      setOpenCropModal(false);
      onChange([...selectedImages, croppedImage]);
    });
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <input
        id="fileInput"
        onChange={handleFileChange}
        style={{ display: "none" }}
        type="file"
        accept=".jpg, .png"
        name=""
        multiple
      />
      <div
        className="flex w-[121px] h-[100px] items-center justify-center border border-borde rounded-md"
        onClick={handleUploadClick}
      >
        <AiOutlineCloudUpload color="#B3B3B3" size={32} />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="newImages">
          {(provided) => (
            <div
              className="flex flex-wrap gap-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {selectedImages.map((item, index) => (
                <Draggable
                  key={index}
                  draggableId={`new-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="h-[100px] w-[121px] relative"
                    >
                      <IoMdCloseCircle
                        className="absolute -top-2 -right-2 bg-white rounded-full"
                        size={20}
                        color="#8D303A"
                        onClick={() => handleRemoveImage(index)}
                      />
                      <img
                        src={URL.createObjectURL(item)}
                        className="h-full w-full rounded-sm object-cover"
                        alt={`Selected Image ${index}`}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="prevImages">
          {(provided) => (
            <div
              className="flex flex-wrap gap-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {prevImagesURL?.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={`prev-${item.id}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="h-[100px] w-[121px] relative"
                    >
                      <IoMdCloseCircle
                        className="absolute -top-2 -right-2 bg-white rounded-full"
                        size={20}
                        color="#8D303A"
                        onClick={() => handlePrevImageRemove(item.id)}
                      />
                      <img
                        src={
                          item.image_name
                            ? EndPoints.IMAGE_BASEURL + item.image_name
                            : ""
                        }
                        className="h-full w-full rounded-sm object-cover"
                        alt={`Previous Image ${index}`}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Transition appear show={openCropModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpenCropModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Crop Image
                  </Dialog.Title>
                  <div className="mt-4">
                    {croppingImage && (
                      <Cropper
                        src={URL.createObjectURL(croppingImage)}
                        style={{ height: 400, width: "100%" }}
                        // Cropper.js options
                        initialAspectRatio={16 / 9}
                        aspectRatio={16 / 9} // Fixed aspect ratio
                        guides={false}
                        cropBoxResizable={true}
                        ref={cropperRef}
                      />
                    )}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleCropSave}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
                      onClick={() => setOpenCropModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AddImages;
