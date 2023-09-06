const chainConfig = {
    bsctestnet: {
        nativeCurrency: {
            label: "TBNB",
            decimals: 18,
        },
        chainId: 97,
        rpcUrls: ["https://data-seed-prebsc-1-s3.binance.org:8545/"],
        blockExplorer: "https://testnet.bscscan.com"
    },
    ethereum: {
        nativeCurrency: {
            label: "ETH",
            decimals: 18,
        },
        chainId: 1,
        rpcUrls: ["https://eth-node-quick.com"],
        blockExplorer: "https://etherscan.io"
    },
    bsc: {
        nativeCurrency: {
            label: "BNB",
            decimals: 18,
        },
        chainId: 56,
        rpcUrls: ["https://bsc-dataseed1.binance.org"],
        blockExplorer: "https://bscscan.com"
    },
    core: {
        nativeCurrency: {
            label: "CORE",
            decimals: 18,
        },
        chainId: 1116,
        rpcUrls: ["https://rpc1.shadowswap.xyz/", "https://rpc.coredao.org/"],
        blockExplorer: "https://scan.coredao.org/"
    }
}

module.exports = chainConfig