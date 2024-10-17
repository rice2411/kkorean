import { Box, Heading, Image, Link, Paragraph } from "@/components/Atoms";

function TestimonialSection() {
    return (
        <>
            <section className="bg-white">
                <Box className="py-8 px-4 mx-auto max-w-screen-2xl text-center lg:py-16 lg:px-6">
                    <Box className="mx-auto max-w-screen-sm">
                        <Heading className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
                            Testimonials
                        </Heading>
                        <Paragraph className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl">
                            Explore the whole collection of open-source web
                            components and elements built with the utility
                            classes from Tailwind
                        </Paragraph>
                    </Box>
                    <Box className="grid mb-8 lg:mb-12 lg:grid-cols-2 ">
                        <Box className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 lg:border-r">
                            <Box className="mx-auto mb-8 max-w-2xl text-gray-500 ">
                                <Heading className="text-lg font-semibold text-gray-900">
                                    Speechless with how easy this was to
                                    integrate
                                </Heading>
                                <Paragraph className="my-4 text-center">
                                    "I recently got my hands on Flowbite Pro,
                                    and holy crap, I'm speechless with how easy
                                    this was to integrate within my application.
                                    Most templates are a pain, code is
                                    scattered, and near impossible to theme.
                                </Paragraph>
                                <Paragraph className="my-4 text-center">
                                    Flowbite has code in one place and I'm not
                                    joking when I say it took me a matter of
                                    minutes to copy the code, customise it and
                                    integrate within a Laravel + Vue
                                    application.
                                </Paragraph>
                                <Paragraph className="my-4 text-center">
                                    If you care for your time, I hands down
                                    would go with this."
                                </Paragraph>
                            </Box>
                            <Box className="flex justify-center items-center space-x-3">
                                <Image
                                    className="w-9 h-9 rounded-full"
                                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                                    alt="profile picture"
                                />
                                <Box className="space-y-0.5 font-medium text-left">
                                    <Box>Bonnie Green</Box>
                                    <Box className="text-sm font-light text-gray-500">
                                        Developer at Open AI
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12">
                            <Box className="mx-auto mb-8 max-w-2xl text-gray-500">
                                <Heading className="text-lg font-semibold text-gray-900">
                                    Solid foundation for any project
                                </Heading>
                                <Paragraph className="my-4 text-center">
                                    "FlowBite provides a robust set of design
                                    tokens and components based on the popular
                                    Tailwind CSS framework. From the most used
                                    UI components like forms and navigation bars
                                    to the whole app screens designed both for
                                    desktop and mobile, this UI kit provides a
                                    solid foundation for any project.
                                </Paragraph>
                                <Paragraph className="my-4 text-center">
                                    Designing with Figma components that can be
                                    easily translated to the utility classes of
                                    Tailwind CSS is a huge timesaver!"
                                </Paragraph>
                            </Box>
                            <Box className="flex justify-center items-center space-x-3">
                                <Image
                                    className="w-9 h-9 rounded-full"
                                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                                    alt="profile picture"
                                />
                                <Box className="space-y-0.5 font-medium text-left">
                                    <Box>Roberta Casas</Box>
                                    <Box className="text-sm font-light text-gray-500">
                                        Lead designer at Dropbox
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 lg:border-b-0 md:p-12 lg:border-r">
                            <Box className="mx-auto mb-8 max-w-2xl text-gray-500">
                                <Heading className="text-lg font-semibold text-gray-900">
                                    Mindblowing workflow and variants
                                </Heading>
                                <Paragraph className="my-4 text-center">
                                    "As someone who mainly designs in the
                                    browser, I've been a casual user of Figma,
                                    but as soon as I saw and started playing
                                    with FlowBite my mind was 🤯.
                                </Paragraph>
                                <Paragraph className="my-4 text-center">
                                    Everything is so well structured and simple
                                    to use (I've learnt so much about Figma by
                                    just using the toolkit).
                                </Paragraph>
                                <Paragraph className="my-4 text-center">
                                    Aesthetically, the well designed components
                                    are beautiful and will undoubtedly level up
                                    your next application."
                                </Paragraph>
                            </Box>
                            <Box className="flex justify-center items-center space-x-3">
                                <Image
                                    className="w-9 h-9 rounded-full"
                                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                                    alt="profile picture"
                                />
                                <Box className="space-y-0.5 font-medium text-left">
                                    <Box>Jese Leos</Box>
                                    <Box className="text-sm font-light text-gray-500">
                                        Software Engineer at Facebook
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-gray-200 md:p-12">
                            <Box className="mx-auto mb-8 max-w-2xl text-gray-500">
                                <Heading className="text-lg font-semibold text-gray-900">
                                    Efficient Collaborating
                                </Heading>
                                <Paragraph className="my-4 text-center">
                                    "This is a very complex and beautiful set of
                                    elements. Under the hood it comes with the
                                    best things from 2 different worlds: Figma
                                    and Tailwind.
                                </Paragraph>
                                <Paragraph className="my-4 text-center">
                                    You have many examples that can be used to
                                    create a fast prototype for your team."
                                </Paragraph>
                            </Box>
                            <Box className="flex justify-center items-center space-x-3">
                                <Image
                                    className="w-9 h-9 rounded-full"
                                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                                    alt="profile picture"
                                />
                                <Box className="space-y-0.5 font-medium text-left">
                                    <Box>Joseph McFall</Box>
                                    <Box className="text-sm font-light text-gray-500">
                                        CTO at Google
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="text-center">
                        <Link
                            to="#"
                            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                        >
                            Show more...
                        </Link>
                    </Box>
                </Box>
            </section>
        </>
    );
}

export default TestimonialSection;
