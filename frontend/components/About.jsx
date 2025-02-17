import { motion } from "framer-motion";

const About = () => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">

            {/* Hero Section */}
            <section className="relative w-full h-[500px] flex items-center justify-center bg-gradient-to-r from-purple-500 via-blue-600 to-pink-600">
                <motion.div
                    className="text-center text-white px-6"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <a href="/"><h1 className="text-5xl font-bold">About Our AI Image Generator</h1></a>
                    <p className="mt-4 text-lg">Transform your words into stunning visuals using AI.</p>
                </motion.div>
            </section>

            {/* How It Works Section */}
            <section className="container mx-auto px-6 py-16">
                <motion.h2
                    className="text-4xl font-extrabold text-center mb-12 text-gray-900"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    How It Works
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-10">
                    {[
                        { img: "/s1.png", title: "Step 1", desc: "Create your account" },
                        { img: "/s2.png", title: "Step 2", desc: "Sign in with your account" },
                        { img: "/s3.png", title: "Step 3", desc: "Generate & download your AI masterpiece" }
                    ].map((step, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg text-center"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.3 }}
                        >
                            <img src={step.img} alt={step.title} className="w-full h-40 object-cover rounded-md" />
                            <h3 className="text-xl font-semibold mt-4">{step.title}</h3>
                            <p className="mt-2 text-gray-600">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-900 text-white py-16">
                <motion.h2
                    className="text-4xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    Key Features
                </motion.h2>

                <div className="container mx-auto grid md:grid-cols-2 gap-10">
                    {[
                        { img: "/ai1.jpg", title: "High-Quality Images", desc: "Generate stunning high-resolution AI images with ease." },
                        { img: "/ai2.jpg", title: "Fast & Efficient", desc: "Get results within seconds using our powerful AI model." },
                        { img: "/ai3.jpg", title: "Customizable Styles", desc: "Choose different artistic styles for your images." },
                        { img: "/ai4.jpg", title: "Free to Use", desc: "Enjoy AI-generated images without any cost." }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            className="flex items-center space-x-6"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.3 }}
                        >
                            <img src={feature.img} alt={feature.title} className="w-24 h-24 object-cover rounded-full shadow-lg" />
                            <div>
                                <h3 className="text-2xl font-semibold">{feature.title}</h3>
                                <p className="text-gray-300">{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16">
                <motion.h2
                    className="text-4xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    What Our Users Say
                </motion.h2>

                <div className="container mx-auto grid md:grid-cols-2 gap-10">
                    {[
                        { name: "Ajay Kumar", review: "This tool is amazing! The images are so realistic and beautiful.", image: "/ajay.png" },
                        { name: "Richa negi", review: "I love how fast and easy it is to generate AI images!", image: "/richa.png" }
                    ].map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.3 }}
                        >
                            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg text-center">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-24 h-24 object-cover rounded-full shadow-md border-2 border-gray-300"
                                />
                                <p className="mt-4 text-gray-700 text-lg italic">"{testimonial.review}"</p>
                                <h4 className="mt-3 text-xl font-semibold text-gray-900">{testimonial.name}</h4>
                            </div>

                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section className="bg-gray-900 text-white py-16 text-center">
                <motion.h2
                    className="text-4xl font-bold mb-6"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    Get In Touch
                </motion.h2>
                <p className="text-gray-300 mb-6">Have questions? Reach out to us.</p>

                <div className="flex flex-wrap gap-4 justify-center">
                    {[
                        { platform: "Portfolio", href: "https://preet-pesonal-portfolio.vercel.app/",  bg: "bg-red-600" },
                        { platform: "GitHub", href: "https://github.com/preetcoder12", bg: "bg-gray-600" },
                        { platform: "LinkedIn", href: "https://www.linkedin.com/in/preet-gusain-986b022a5/", bg: "bg-blue-600" },
                        { platform: "Instagram", href: "https://www.instagram.com/preet_gusain200_/?utm_source=qr&igsh=MXhmenR4ZXgwc2xvbA%3D%3D#", bg: "bg-pink-600" }
                    ].map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className={`${link.bg} px-6 py-3 rounded-lg text-white font-semibold hover:bg-purple-500 transition-all`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {link.platform}
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
