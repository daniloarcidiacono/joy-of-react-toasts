import React from "react";

export function useKeypress(code, callback) {
    React.useEffect(() => {
        function handleKeydown(e) {
            if (e.code === code) {
                callback && callback(e);
            }
        }

        window.addEventListener('keydown', handleKeydown);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
        }
    }, [code, callback]);
}