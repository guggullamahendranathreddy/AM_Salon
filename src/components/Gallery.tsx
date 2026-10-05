import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ChevronLeft, ChevronRight, Sparkle } from "lucide-react";
import { GALLERY_ITEMS } from "../data";
import { GalleryItem } from "../types";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const filters = [
    { id: "all", label: "Show All" },
    { id: "interiors", label: "Salon Interiors" },
    { id: "hair-styling", label: "Hair Styling Zone" },
    { id: "hair-wash", label: "Hair Wash & Spa" },
    { id: "facial", label: "Facial Treatment" },
    { id: "products", label: "Product Display" },
    { id: "menus", label: "Price Menus" },
  ];

  const filteredItems = activeFilter === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const handleOpenLightbox = (itemId: string) => {
    const globalIdx = GALLERY_ITEMS.findIndex((it) => it.id === itemId);
    if (globalIdx !== -1) {
      setSelectedPhoto(globalIdx);
    }
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhoto !== null) {
      setSelectedPhoto((prev) => (prev! + 1) % GALLERY_ITEMS.length);
    }
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhoto !== null) {
      setSelectedPhoto((prev) => (prev! - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };
 return[]
}