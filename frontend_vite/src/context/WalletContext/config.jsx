import StellarSdk from "stellar-sdk";

interface NetworkItemConfig {
    url: String;
    network: String;
    stellarExpertTxUrl: String;
    stellarExpertAccountUrl: String;
    stellarExpertAssetUrl: String;
    stellarExpertLiquidityPoolUrl: String;
}

interface NetworkConfig {
    testnet: NetworkItemConfig;
    public: NetworkItemConfig;
}

export const networkConfig: NetworkConfig = {
    testnet: {
        url: "https://horizon-testnet.stellar.org",
        network: StellarSdk.Networks.TESTNET,
        stellarExpertTxUrl: `${STELLAR_EXPERT_URL}/testnet/tx/`,
        stellarExpertAccountUrl: `${STELLAR_EXPERT_URL}/testnet/account/`,
        stellarExpertAssetUrl: `${STELLAR_EXPERT_URL}/testnet/asset/`,
        stellarExpertLiquidityPoolUrl: `${STELLAR_EXPERT_URL}/testnet/liquidity-pool/`,
    },
    public: {
        url: "https://horizon-futurenet.stellar.org",
        network: StellarSdk.Networks.TESTNET,
        stellarExpertTxUrl: `${STELLAR_EXPERT_URL}/futurenet/tx/`,
        stellarExpertAccountUrl: `${STELLAR_EXPERT_URL}/futurenet/account/`,
        stellarExpertAssetUrl: `${STELLAR_EXPERT_URL}/futurenet/asset/`,
        stellarExpertLiquidityPoolUrl: `${STELLAR_EXPERT_URL}/futurenet/liquidity-pool/`,
    },
}

export const defaultStellarBipPath = "44'/148'/0'";
