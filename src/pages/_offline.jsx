import Head from 'next/head';

export default function OfflinePage() {
    return (
        <>
            <Head>
                <title>Yahh.. Kamu Offline</title>
            </Head>
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl font-bold mb-4">Kamu Offline</h1>
                <p className="text-lg">Koneksi internet-mu terputus. Silakan periksa kembali koneksimu.</p>
            </div>
        </>
    );
}