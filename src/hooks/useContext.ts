import {useContext, Context} from "react";

const useContextApp = <T>(target: Context<T>) => {
    const context = useContext(target)
    if (context === null) throw new Error('context error')
    return context
}

export default useContextApp;
