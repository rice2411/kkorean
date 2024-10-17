import { Box, Heading, Paragraph } from "@/components/Atoms";

function StatictisSection() {
    return (
        <section className="bg-white ">
            <Box className="max-w-screen-2xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <Box className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    <Heading className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">
                        What a number
                    </Heading>
                    <Paragraph className="font-light text-gray-500 sm:text-xl text-center">
                        We use an agile approach to test assumptions and connect
                        with the needs of your audience early and often.
                    </Paragraph>
                </Box>
                <Box className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 ">
                    <Box className="flex flex-col items-center justify-center">
                        <Heading className="mb-2 text-3xl md:text-4xl font-extrabold">
                            73M+
                        </Heading>
                        <Paragraph className="font-light text-gray-500 ">
                            developers
                        </Paragraph>
                    </Box>
                    <Box className="flex flex-col items-center justify-center">
                        <Heading className="mb-2 text-3xl md:text-4xl font-extrabold">
                            1B+
                        </Heading>
                        <Paragraph className="font-light text-gray-500 ">
                            contributors
                        </Paragraph>
                    </Box>
                    <Box className="flex flex-col items-center justify-center">
                        <Heading className="mb-2 text-3xl md:text-4xl font-extrabold">
                            4M+
                        </Heading>
                        <Paragraph className="font-light text-gray-500 ">
                            organizations
                        </Paragraph>
                    </Box>
                </Box>
            </Box>
        </section>
    );
}

export default StatictisSection;
