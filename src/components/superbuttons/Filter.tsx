"use client";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

/**
 * The `Filter` component provides a dropdown menu with various filtering options for the user interface.
 * It uses the `@headlessui/react` library to implement the dropdown menu functionality.
 * The menu includes options to edit, duplicate, archive, and delete items.
 * The component is exported as a default export.
 */
export const Filter = () => {
  return (
    <div className="">
      <Menu>
        <MenuButton className="flex bg-foreground dark:bg-foreground/10 text-background dark:text-foreground justify-between items-center rounded-lg px-4 py-2 w-fit cursor-pointer">
          Filter
          <ChevronDownIcon className="size-4 relative left-1 fill-background dark:fill-foreground" />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="absolute z-10 mt-2 w-48 origin-top-left bg-background/50 rounded-xl main-border backdrop-blur-[5px] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="p-1">
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-sm data-[focus]:bg-foreground/10 hover:bg-white/10 hover:text-white text-white ">
                  Pirate
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-sm data-[focus]:bg-foreground/10 hover:bg-white/10 hover:text-white text-white ">
                  Entertainment
                </button>
              </MenuItem>
              {/* <div className="my-1 h-px bg-white/5" /> */}
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-sm data-[focus]:bg-foreground/10 hover:bg-white/10 hover:text-white text-white ">
                  Creative
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-sm data-[focus]:bg-foreground/10 hover:bg-white/10 hover:text-white text-white ">
                  AI
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};
