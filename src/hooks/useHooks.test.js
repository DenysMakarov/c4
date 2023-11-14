import { createContext, useContext } from 'react';
import {renderHook} from "@testing-library/react";
import useContextApp from "./useContext";

describe('useContextApp Hook', () => {
    it('returns the context value when provided', () => {
        const testValue = 'Test Context Value';
        const TestContext = createContext(testValue);

        const wrapper = ({ children }) => <TestContext.Provider value={testValue}>{children}</TestContext.Provider>;
        const { result } = renderHook(() => useContextApp(TestContext), { wrapper });

        expect(result.current).toBe(testValue);
    });
});
