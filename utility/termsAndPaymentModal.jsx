import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useEffect , useContext } from "react";
import * as NonAuthService from "../components/api/service/NonAuthService";
import LanguageContext from "../Context/LanguageContext";
export default function MyModal({ pageID, isOpen, toogleModal }) {
 
  const [terms, setTerams] = useState({});
  const { languagedata } = useContext(LanguageContext);
  console.log(pageID)
  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await NonAuthService.get_page_detail({
          page_id: pageID,
        });
        setTerams(response[0]);
      } catch (error) {
        console.log(error);
      }
    };
    FetchData();
  }, [pageID]);
  console.log(terms);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={toogleModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full  items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[800px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="py-2">
                    <h1 className="text-center font-con text-xl text-secondary ">
                      {/* Terms And Condition */}
                      {terms?.[`page_name_${languagedata}`]}
                    </h1>
                    <div
                     
                      dangerouslySetInnerHTML={{
                        __html: terms?.[`page_content_${languagedata}`],
                      }}
                    ></div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={toogleModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
