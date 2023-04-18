import React from 'react';

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export interface Props {
    title: string
    children: React.ReactElement
    open: boolean
    setOpen: (value: boolean) => void
}
export  default function ModalUser(props: Props){

    const {title, children, open, setOpen, ...rest} = props

    return (
        <Transition.Root show={open} as={Fragment} {...rest}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => {}}
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
              <div className="fixed inset-0 bg-[#6b7280] bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-[#111827]"
                          >
                            {title}
                          </Dialog.Title>
                          <div className="mt-2">
                            {children}
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-base font-medium text-[#374151] shadow-sm hover:bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                              onClick={() => setOpen(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
    )
}
