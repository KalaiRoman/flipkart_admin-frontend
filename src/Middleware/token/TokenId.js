import React, { useEffect, useState } from 'react';
function TokenId() {
    const [toknname, setTokenName] = useState("");
    useEffect(() => {
        if (localStorage.getItem("flip-token-ad")) {
            setTokenName(JSON.parse(localStorage.getItem("flip-token-ad")))
        }
    }, [toknname, localStorage.getItem("flip-token-ad")])
    return { toknname }
}
export default TokenId
