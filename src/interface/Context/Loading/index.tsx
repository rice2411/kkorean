interface UseLoadingReturnType {
    loading: boolean;
    showLoading: () => void;
    hideLoading: () => void;
    setLoadingText: (text: string) => void;
}

export type { UseLoadingReturnType };
