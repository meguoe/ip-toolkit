export interface CidrInfo {
    cidrMask: number;
    ipCount: number;
    usableCount: number;
    subnetMask: string;
    firstHost: string;
    lastHost: string;
    networkAddress?: string;
    broadcastAddress?: string;
}
