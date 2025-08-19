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
        <div className="relative w-56">
            <Listbox value={selectedValue} onChange={onChange}>
                {({ open }) => (
                    <div className="relative">
                        {/* دکمه */}
                        <Listbox.Button
                            className={`
                flex w-full cursor-pointer items-center justify-between 
                rounded-xl border px-4 py-2 text-left transition 
                border-[var(--accent)] bg-[var(--accent)] 
                text-[var(--input-text)] dark:text-[var(--text)]
                focus:outline-none
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
                            <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-300" />
                        </Listbox.Button>

                        {/* لیست گزینه‌ها */}
                        <AnimatePresence>
                            {open && (
                                <Listbox.Options
                                    as={motion.ul}
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className={`
                    absolute mt-1 max-h-60 w-full overflow-auto rounded-xl 
                    shadow-lg z-20 bg-[var(--menu-bg)] focus:outline-none
                  `}
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
                                        >
                                            {({ active, selected }) => (
                                                <div
                                                    className={`
                            cursor-pointer px-4 py-2 transition 
                            ${
                                active
                                    ? "bg-[var(--accent)] text-[var(--text)]"
                                    : ""
                            }
                            ${selected ? "font-semibold" : ""}
                            ${
                                opt.disabled
                                    ? "cursor-not-allowed opacity-50"
                                    : ""
                            }
                          `}
                                                >
                                                    {opt.name || opt.label}
                                                </div>
                                            )}
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
