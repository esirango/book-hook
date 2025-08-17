"use client";

import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
    id?: string;
    code?: string;
    value?: string;
    name?: string;
    label?: string;
    disabled?: boolean;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
}

export default function CustomSelect({
    options,
    value,
    onChange,
    placeholder = "-",
}: CustomSelectProps) {
    const isValidValue = options.some(
        (opt) => opt.id === value || opt.code === value || opt.value === value
    );

    const selectedValue = isValidValue ? value : "";

    return (
        <div className="relative w-56 ">
            <Listbox value={selectedValue} onChange={onChange}>
                {({ open }) => (
                    <div className="relative">
                        <Listbox.Button
                            className={`
        cursor-pointer px-4 py-2 w-full text-left
        border rounded-xl flex items-center justify-between
        text-[var(--input-text-light)] dark:text-[var(--input-text-dark)]
        placeholder-[var(--placeholder-light)] dark:placeholder-[var(--placeholder-dark)]
        border-[var(--accent-light)] dark:border-[var(--accent-dark)]
        bg-[var(--accent-dark)] dark:bg-[var(--accent-light)]
        focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)] dark:focus:ring-[var(--accent-dark)]
        transition-all
    `}
                        >
                            {options.find(
                                (opt) =>
                                    opt.id === value ||
                                    opt.code === value ||
                                    opt.value === value
                            )?.name ||
                                options.find(
                                    (opt) =>
                                        opt.id === value ||
                                        opt.code === value ||
                                        opt.value === value
                                )?.label ||
                                placeholder}
                            <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                        </Listbox.Button>

                        <AnimatePresence>
                            {open && (
                                <Listbox.Options
                                    as={motion.ul}
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="
    absolute outline-0 mt-1 w-full max-h-60 overflow-auto
    bg-[var(--menu-bg-light)] dark:bg-[var(--menu-bg-dark)]
    rounded-xl shadow-lg z-20
  "
                                >
                                    {options.map((opt) => (
                                        <Listbox.Option
                                            key={
                                                opt.id || opt.code || opt.value
                                            }
                                            value={
                                                opt.id || opt.code || opt.value
                                            }
                                            disabled={opt.disabled}
                                            className={({ active, selected }) =>
                                                `cursor-pointer px-4 py-2 transition-colors
         ${
             active
                 ? "bg-[var(--accent-light)] dark:bg-[var(--accent-dark)]"
                 : ""
         }
         ${selected ? "font-semibold" : ""}
         ${opt.disabled ? "opacity-50 cursor-not-allowed" : ""}`
                                            }
                                        >
                                            {opt.name || opt.label}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </Listbox>
        </div>
    );
}
