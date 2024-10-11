import { Button, Typography, Container } from '@mui/material';
import Image from 'next/image';

const Homepage = () => {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-b from-blue-100 to-white py-24 px-4 flex items-center justify-between relative overflow-hidden">
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="135" cy="10" r="8" fill="#fff" className="opacity-40" />
            <circle cx="140" cy="80" r="12" fill="#fff" className="opacity-40" />
            <circle cx="100" cy="20" r="14" fill="#fff" className="opacity-40" />
            <circle cx="40" cy="30" r="11" fill="#fff" className="opacity-40" />
            <circle cx="150" cy="35" r="7" fill="#fff" className="opacity-40" />
            <circle cx="70" cy="50" r="6" fill="#fff" className="opacity-40" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl pl-32">
          <Typography variant="h2" className="mb-4 font-extrabold text-4xl md:text-5xl text-gray-900">
            An All-in-One Tool for Iron Meteorites
          </Typography>
          <Typography variant="body1" className="mb-6 text-gray-700 text-lg md:text-xl">
            Easily plot and classify iron meteorite data with our all-in-one tool, designed for researchers and students.
          </Typography>
          <div className="flex space-x-4">
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="/classify"
              className="flex items-center justify-center relative group"
              style={{ paddingRight: '2rem' }}
            >
              Classify
              <span className="absolute right-4 opacity-0 transition-all duration-300 transform group-hover:opacity-100 group-hover:translate-x-1">→</span> {/* Arrow on hover */}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              href="/plot"
              className="flex items-center justify-center relative group"
              style={{ paddingRight: '2rem' }}
            >
              Plot
              <span className="absolute right-4 opacity-0 transition-all duration-300 transform group-hover:opacity-100 group-hover:translate-x-1">→</span> {/* Arrow on hover */}
            </Button>
          </div>
        </div>

        <div className="hidden md:block relative z-10 w-2/5 pr-32">
          <Image
            src="/meteorite.svg"
            alt="Meteorite"
            layout="responsive"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
      </div>
      {/* About */}
      <div className="bg-white py-20">
      <Container maxWidth="lg">
        <Typography variant="h3" className="text-center mb-6 font-extrabold text-4xl text-gray-900">
          About Our Team
        </Typography>
        <Typography variant="body1" className="text-gray-700 text-lg md:text-xl text-center">
          This tool was built by Peng Ni (UCLA), Bidong Zhang (Rice University), and Emily Pham (UCLA).
        </Typography>
      </Container>
    </div>
      {/* Footer */}
      <footer className="flex justify-center items-center h-16 text-gray-400">
        <p>Made with &hearts; by UCLA EPSS</p>
      </footer>
    </div>
  );
};

export default Homepage;
