"use client";

import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useThemeStore } from "@/store/themeStore";

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
    const { isDark } = useThemeStore();

    const isValidValue = options.some(
        (opt) => opt.id === value || opt.code === value || opt.value === value
    );

    const selectedValue = isValidValue ? value : "";

    const styles = {
        button: {
            cursor: "pointer",
            padding: "0.5rem 1rem",
            width: "100%",
            textAlign: "left" as const,
            borderRadius: "0.75rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: `1px solid ${
                isDark ? "var(--accent-dark)" : "var(--accent-light)"
            }`,
            backgroundColor: isDark
                ? "var(--accent-dark)"
                : "var(--accent-light)",
            color: isDark ? "var(--text-dark)" : "var(--input-text-light)",
            outline: "none",
            transition: "all 0.2s ease",
        },
        optionsContainer: {
            position: "absolute" as const,
            marginTop: "0.25rem",
            width: "100%",
            maxHeight: "15rem",
            overflow: "auto" as const,
            borderRadius: "0.75rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 20,
            backgroundColor: isDark
                ? "var(--menu-bg-dark)"
                : "var(--menu-bg-light)",
            outline: "none",
        },
        option: (active: boolean, selected: boolean, disabled?: boolean) => ({
            cursor: disabled ? "not-allowed" : "pointer",
            padding: "0.5rem 1rem",
            transition: "background-color 0.2s",
            fontWeight: selected ? 600 : 400,
            opacity: disabled ? 0.5 : 1,
            backgroundColor: active
                ? isDark
                    ? "var(--accent-dark)"
                    : "var(--accent-light)"
                : "transparent",
        }),
        icon: {
            width: "1rem",
            height: "1rem",
            color: isDark ? "#D1D5DB" : "#9CA3AF",
        },
    };

    return (
        <div
            style={{
                position: "relative",
                width: "14rem",
            }}
        >
            <Listbox value={selectedValue} onChange={onChange}>
                {({ open }) => (
                    <div style={{ position: "relative" }}>
                        <Listbox.Button style={styles.button}>
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
                            <ChevronDown style={styles.icon} />
                        </Listbox.Button>

                        <AnimatePresence>
                            {open && (
                                <Listbox.Options
                                    as={motion.ul}
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    style={styles.optionsContainer}
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
                                                    style={styles.option(
                                                        active,
                                                        selected,
                                                        opt.disabled
                                                    )}
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
