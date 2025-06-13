import React from 'react';


const HomePage: React.FC = () => {


  const handleDownloadClick = () => {
    alert('Download functionality coming soon!');
  };

  const handleLearnMoreClick = () => {
    alert('Learn more about our features!');
  };

  const handleSignUpClick = () => {
    alert('Sign up functionality coming soon!');
  };


  return (
<>
    <section className="bg-white w-full py-28 px-16">
    <div className="max-w-4xl mx-auto text-center">
      {/* Main Heading */}
      <h1 className="font-roboto  text-6xl font-bold text-black leading-tight mb-8">
        Empower Your Academic Journey with KMC Hub
      </h1>

      {/* Subtitle */}
      <p className="font-roboto text-lg font-normal text-black leading-relaxed mb-12 max-w-3xl mx-auto">
        KMC Hub connects students and faculty, enabling seamless communication and collaboration. 
        Join us to access essential resources, share ideas, and engage in your academic community.
      </p>

      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-6">
        <button 
          onClick={handleSignUpClick}


          className="h-12 px-6"
        >
          Sign Up
        </button>
        <button 
          onClick={handleLearnMoreClick}


          className="h-12 px-8"
        >
          Learn More
        </button>
      </div>
    </div>

    {/* Hero Image Carousel */}
    {/* <div className="mt-16 mx-auto max-w-6xl">
      <ImageCarousel 
        images={heroImages}
        autoPlayInterval={4000}
        showNavigation={true}
        showDots={true}
        className="shadow-xl"
      />
    </div> */}
  </section>

    <div className="min-h-screen bg-white">

      
      {/* Features Section */}
      <section className="bg-white w-full py-28 px-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-roboto text-base font-semibold text-black mb-4">
            Features
          </p>
          <h2 className="font-roboto text-5xl font-bold text-black leading-tight mb-8">
            Discover the Power of KMC Hub
          </h2>
          <p className="font-roboto text-lg font-normal text-black leading-relaxed mb-16 max-w-3xl mx-auto">
            KMC Hub is designed to enhance collaboration among students and faculty. Experience seamless communication and resource sharing in one unified platform.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Engaging Class Group Chats */}
            <div className="text-center">
              <img 
                src="/images/img_placeholder_image.png" 
                alt="Class Group Chats" 
                className="w-full h-58 object-cover mb-8 rounded-lg"
              />
              <h3 className="font-roboto text-3xl font-bold text-black leading-tight mb-6">
                Engaging Class Group Chats
              </h3>
              <p className="font-roboto text-base font-normal text-black leading-relaxed">
                Join class-specific group chats for real-time discussions.
              </p>
            </div>

            {/* Dynamic Collaboration Feed */}
            <div className="text-center">
              <img 
                src="/images/img_placeholder_image.png" 
                alt="Collaboration Feed" 
                className="w-full h-58 object-cover mb-8 rounded-lg"
              />
              <h3 className="font-roboto text-3xl font-bold text-black leading-tight mb-6">
                Dynamic Collaboration Feed
              </h3>
              <p className="font-roboto text-base font-normal text-black leading-relaxed">
                Share ideas and projects with your peers effortlessly.
              </p>
            </div>

            {/* Comprehensive Resource Library */}
            <div className="text-center">
              <img 
                src="/images/img_placeholder_image.png" 
                alt="Resource Library" 
                className="w-full h-58 object-cover mb-8 rounded-lg"
              />
              <h3 className="font-roboto text-3xl font-bold text-black leading-tight mb-6">
                Comprehensive Resource Library
              </h3>
              <p className="font-roboto text-base font-normal text-black leading-relaxed">
                Access essential academic materials all in one place.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-6">
            <button
            >
              Join
            </button>
            <button 
              onClick={handleDownloadClick}
              className="flex items-center space-x-2 font-roboto text-base font-normal text-black border border-black px-6 py-3 h-12 hover:bg-gray-50 transition-colors"
            >
              <span>Download</span>
              <img 
                src="/images/img_chevronright.svg" 
                alt="Arrow" 
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </section>

      {/* Collaboration Feed Section */}
      <section className="bg-white w-full py-28 px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-roboto text-4xl font-bold text-black leading-tight mb-8">
                Explore Our Dynamic Collaboration Feed: Connect, Share, and Engage with Peers
              </h2>
              <p className="font-roboto text-lg font-normal text-black leading-relaxed mb-12">
                Stay updated with the latest posts from your classmates and faculty. Our collaboration feed fosters a vibrant academic community where ideas come to life.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-roboto text-xl font-bold text-black mb-4">
                    Recent Posts
                  </h3>
                  <p className="font-roboto text-base font-normal text-black leading-relaxed">
                    Check out engaging content shared by your peers, including videos and images.
                  </p>
                </div>
                <div>
                  <h3 className="font-roboto text-xl font-bold text-black mb-4">
                    Join the Conversation
                  </h3>
                  <p className="font-roboto text-base font-normal text-black leading-relaxed">
                    Contribute your thoughts and ideas to enrich our collaborative learning environment.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="/images/img_placeholder_image_640x600.png" 
                alt="Collaboration Feed" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Join Today Section */}
      <section className="bg-white w-full py-20 px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="font-roboto text-4xl font-bold text-black leading-tight mb-6">
                Join the KMC Hub Today
              </h2>
              <p className="font-roboto text-lg font-normal text-black leading-relaxed">
                Connect, collaborate, and access resources with ease.
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleSignUpClick}


                className="h-12 px-6"
              >
                Sign Up
              </button>
              <button
                onClick={handleLearnMoreClick}


                className="h-12 px-8"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="bg-white w-full py-28 px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-roboto text-base font-semibold text-black mb-4">
                Connect
              </p>
              <h2 className="font-roboto text-5xl font-bold text-black leading-tight mb-8">
                Stay Connected with KMC Hub Anywhere
              </h2>
              <p className="font-roboto text-lg font-normal text-black leading-relaxed mb-12">
                Download the KMC Hub mobile app for instant access to class chats, resources, and collaborative tools. Experience seamless communication and stay updated on the go!
              </p>

              <div className="flex space-x-4">
                <button 
                  onClick={handleDownloadClick}
                  className="h-12 px-8"
                >
                  Download
                </button>
                <button 
                  onClick={handleLearnMoreClick}
                  className="flex items-center space-x-2 font-roboto text-base font-normal text-black border border-black px-6 py-3 h-12 hover:bg-gray-50 transition-colors"
                >
                  <span>Learn More</span>
                  <img 
                    src="/images/img_chevronright.svg" 
                    alt="Arrow" 
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>
            <div>
              <img 
                src="/images/img_placeholder_image_640x600.png" 
                alt="Mobile App" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white w-full py-28 px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-roboto text-4xl font-bold text-black leading-tight mb-8">
                Empowering KMC's academic community through seamless collaboration and resource sharing.
              </h2>
              <p className="font-roboto text-lg font-normal text-black leading-relaxed">
                KMC Hub's mission is to enhance communication and collaboration among students and faculty. By centralizing academic resources and facilitating secure interactions, we aim to create a vibrant learning environment.
              </p>
            </div>
            <div>
              <img 
                src="/images/img_placeholder_image_640x600.png" 
                alt="Mission" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
    </>
  );
};

export default HomePage;