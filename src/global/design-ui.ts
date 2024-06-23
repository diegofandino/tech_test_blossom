import zustand, { create } from "zustand";

export interface IDesignUi {
	isMobile: boolean;
	setIsMobile: (isMobile: boolean) => void;
}

export const useDesignUi = create<IDesignUi>((set) => ({
	isMobile: false,
	setIsMobile: (isMobile: boolean) => set((state) => ({ ...state, isMobile })),
}))