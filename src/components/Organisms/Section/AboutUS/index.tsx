import { FileHelpers } from "@/helpers";
import { Box, Heading, Image, Link, Paragraph } from "@/components/Atoms";

function AboutUSSection() {
    const data = [
        {
            id: 1,
            name: "Bonnie Green",
            position: "CEO &amp; Web Developer",
            desc: "Bonnie drives the technical strategy of the Flowbite platform and brand.",
            image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
        },
        {
            id: 2,
            name: "Jese Leos",
            position: "CTO",
            desc: "Jese drives the technical strategy of the flowbite platform and brand.",
            image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png",
        },
        {
            id: 3,
            name: "Michael Gough",
            position: "Senior Front-end Developer",
            desc: "Michael drives the technical strategy of the flowbite platform and brand.",
            image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png",
        },
        {
            id: 4,
            name: "Lana Byrd",
            position: "Marketing &amp; Sale",
            desc: "Lana drives the technical strategy of the flowbite platform and brand.",
            image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png",
        },
    ];

    return (
        <section className="bg-white">
            <Box className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <Box className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                    <Heading className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
                        Our Team
                    </Heading>
                    <Paragraph className="font-light text-gray-500 lg:mb-16 sm:text-xl">
                        Explore the whole collection of open-source web
                        components and elements built with the utility classes
                        from Tailwind.
                    </Paragraph>
                </Box>
                <Box className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                    {data.map((item) => (
                        <Box
                            className="items-center bg-gray-50 rounded-lg shadow sm:flex"
                            key={item.id}
                        >
                            <Box>
                                <Image
                                    className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                                    src={item.image}
                                    alt={`${item.name} Avatar`}
                                />
                            </Box>
                            <Box className="p-5">
                                <Heading className="text-xl font-bold tracking-tight text-gray-900">
                                    {item.name}
                                </Heading>
                                <Paragraph className="text-gray-500">
                                    {item.position}
                                </Paragraph>
                                <Paragraph className="mt-3 mb-4 font-light text-gray-500">
                                    {item.desc}
                                </Paragraph>
                                <Box className="flex space-x-4 sm:mt-0">
                                    <Link
                                        to="#"
                                        className="text-gray-500 hover:text-gray-900"
                                    >
                                        <Image
                                            src={FileHelpers.getLocalFile(
                                                "facebook",
                                                "svg"
                                            )}
                                            className="w-5 h-5"
                                            alt="Facebook Icon"
                                        />
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </section>
    );
}

export default AboutUSSection;
