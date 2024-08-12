import Head from 'next/head'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
// import Image from 'next/image'
// import gymImage from '../public/images/gym.jpg'  // Ensure you have this image in the public/images directory

const About = () => {
  return (
    <>
      <Navbar />
      <Head>
        <title>About Us | FitExis</title>
        <meta name="description" content="Learn more about FitExis, our mission, and our services." />
      </Head>
      <main className="min-h-screen bg-gray-900 text-white pt-24"> {/* Add padding-top here */}
        <div className="relative">
          {/* <Image src={gymImage} alt="Fitness Hub" layout="fill" objectFit="cover" className="absolute inset-0 -z-10 opacity-40" /> */}
          <div className="relative p-8">
            <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-8">
              <h1 className="text-4xl font-bold text-center mb-6">About FitExis</h1>
              <p className="text-lg mb-4">
                Welcome to FitExis, your ultimate destination for flexible gym memberships and personalized fitness experiences. Our platform offers a variety of membership plans, including daily, weekly, and monthly options, tailored to fit your lifestyle and fitness goals.
              </p>
              <p className="text-lg mb-4">
                At FitExis, we believe in making fitness accessible and enjoyable for everyone. Our app connects you with gyms in your area, providing detailed information about each gym’s facilities, trainers, and equipment. You can easily book visits, make payments, and track your progress all in one place.
              </p>
              <p className="text-lg mb-4">
                Our mission is to help you achieve your fitness goals with convenience and support. We offer daily progress tracking, professional fitness videos, and the option to book online or offline classes with experienced trainers. Whether you’re a seasoned athlete or just starting your fitness journey, FitExis is here to support you every step of the way.
              </p>
              <p className="text-lg">
                If you have any questions or need assistance, please feel free to <a href="mailto:support@FitExis.com" className="text-blue-400 underline">contact us</a>. We’re here to help!
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default About
