"use client";
import { Fragment, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

export const VersionSwitch = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Menu as="div" className="relative">
        <MenuButton
          className="main-border bg-black/5 text-xs leading-5 font-semibold rounded-full py-1 px-3 flex items-center space-x-2 dark:highlight-white/5"
          onClick={() => setIsOpen(!isOpen)}
        >
          v4.0
          <ChevronDownIcon className="size-4 relative left-[2px] fill-foreground" />
        </MenuButton>
        <Transition
          as={Fragment}
          show={isOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems
            static
            className="absolute z-10 mt-2 w-48 origin-top-left bg-background/50 rounded-xl main-border backdrop-blur-[5px] divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="p-1">
              {["v4.0", "v3.4", "OG"].map((version) => (
                <MenuItem key={version}>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-sm data-[focus]:bg-foreground/10 hover:bg-white/10 hover:text-white text-white ">
                    {version}
                  </button>
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};
