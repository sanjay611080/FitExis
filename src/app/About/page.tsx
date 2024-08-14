/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
// import Image from 'next/image'
// import gymImage from '../public/images/gym.jpg'  // Ensure you have this image in the public/images directory

const About = () => {
  return (
    <>
      <Navbar showSearch={false}/>
      <Head>
        <title>About Us | FitExis</title>
        <meta name="description" content="Learn more about FitExis, our mission, and our services." />
      </Head>
      <main className="min-h-screen bg-white text-black pt-24"> {/* Change to white background */}
        <div className="relative">
          {/* <Image src={gymImage} alt="Fitness Hub" layout="fill" objectFit="cover" className="absolute inset-0 -z-10 opacity-40" /> */}
          <div className="relative p-8">
           
            {/* About Us Section */}
            <div className="max-w-4xl mx-auto  rounded-lg p-8 mb-12"> {/* White background for about us section */}
            <h1 className="text-4xl font-bold text-center mb-4">Welcome to FitExis</h1>
              <p className="text-lg mb-4">
                Your ultimate destination for flexible gym memberships and personalized fitness experiences. Our platform offers a variety of membership plans, including daily, weekly, and monthly options, tailored to fit your lifestyle and fitness goals.
              </p>
              <p className="text-lg mb-4">
                At FitExis, we believe in making fitness accessible and enjoyable for everyone. Our app connects you with gyms in your area, providing detailed information about each gym’s facilities, trainers, and equipment. You can easily book visits, make payments, and track your progress all in one place.
              </p>
              <p className="text-lg mb-4">
                Our mission is to help you achieve your fitness goals with convenience and support. We offer daily progress tracking, professional fitness videos, and the option to book online or offline classes with experienced trainers. Whether you’re a seasoned athlete or just starting your fitness journey, FitExis is here to support you every step of the way.
              </p>
              <p className="text-lg">
                If you have any questions or need assistance, please feel free to <a href="mailto:support@FitExis.com" className="text-blue-600 underline">contact us</a>. We’re here to help!
              </p>
            </div>

            

            {/* Contact Form Section */}
            <section id="contact" className="bg-gray-100 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
              <form action="mailto:support@FitExis.com" method="post" encType="text/plain" className="max-w-2xl mx-auto">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-lg mb-2">Name</label>
                  <input type="text" id="name" name="name" className="w-full p-2 rounded bg-white border border-gray-300 text-black" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-lg mb-2">Email</label>
                  <input type="email" id="email" name="email" className="w-full p-2 rounded bg-white border border-gray-300 text-black" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-lg mb-2">Message</label>
                  <textarea id="message" name="message" className="w-full p-2 rounded bg-white border border-gray-300 text-black" required></textarea>
                </div>
                <button type="submit" className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                  Send Message
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default About
