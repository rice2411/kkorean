import { Box, Heading, Image, Paragraph } from "@/components/Atoms";

function ContentSection() {
    return (
        <section className="bg-white">
            <Box className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-2xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <Box className="font-light text-gray-500 sm:text-lg">
                    <Heading className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
                        We didn't reinvent the wheel
                    </Heading>
                    <Paragraph className="mb-4">
                        We are strategists, designers and developers. Innovators
                        and problem solvers. Small enough to be simple and
                        quick, but big enough to deliver the scope you want at
                        the pace you need. Small enough to be simple and quick,
                        but big enough to deliver the scope you want at the pace
                        you need.
                    </Paragraph>
                    <Paragraph>
                        We are strategists, designers and develoParagraphers.
                        Innovators and problem solvers. Small enough to be
                        simple and quick.
                    </Paragraph>
                </Box>
                <Box className="grid grid-cols-2 gap-4 mt-8">
                    <Image
                        className="w-full rounded-lg"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
                        alt="office content 1"
                    />
                    <Image
                        className="mt-4 w-full lg:mt-10 rounded-lg"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
                        alt="office content 2"
                    />
                </Box>
            </Box>
        </section>
    );
}

export default ContentSection;
