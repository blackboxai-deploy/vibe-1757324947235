'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import Header from '../components/Layout/Header';

const HomePage: React.FC = () => {
  const specializations = [
    {
      id: '1',
      name: 'General Medicine',
      description: 'Primary healthcare and routine check-ups',
      icon: '🩺',
      averageFee: 25,
      doctorCount: 150,
    },
    {
      id: '2',
      name: 'Cardiology',
      description: 'Heart and cardiovascular health',
      icon: '❤️',
      averageFee: 50,
      doctorCount: 45,
    },
    {
      id: '3',
      name: 'Dermatology',
      description: 'Skin, hair, and nail conditions',
      icon: '🔬',
      averageFee: 40,
      doctorCount: 32,
    },
    {
      id: '4',
      name: 'Psychiatry',
      description: 'Mental health and wellness',
      icon: '🧠',
      averageFee: 60,
      doctorCount: 28,
    },
    {
      id: '5',
      name: 'Pediatrics',
      description: 'Healthcare for children and infants',
      icon: '👶',
      averageFee: 35,
      doctorCount: 67,
    },
    {
      id: '6',
      name: 'Gynecology',
      description: 'Women\'s reproductive health',
      icon: '🌸',
      averageFee: 45,
      doctorCount: 41,
    },
  ];

  const featuredDoctors = [
    {
      id: 'dr1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiology',
      experience: 12,
      rating: 4.9,
      consultationFee: 50,
      avatar: 'https://placehold.co/200x200?text=Dr.+Sarah+Johnson+Professional+Doctor+Portrait',
      totalConsultations: 2847,
      languages: ['English', 'Spanish'],
      nextAvailable: 'Today, 2:30 PM',
    },
    {
      id: 'dr2',
      name: 'Dr. Michael Chen',
      specialization: 'Dermatology',
      experience: 8,
      rating: 4.8,
      consultationFee: 40,
      avatar: 'https://placehold.co/200x200?text=Dr.+Michael+Chen+Professional+Doctor+Portrait',
      totalConsultations: 1923,
      languages: ['English', 'Mandarin'],
      nextAvailable: 'Tomorrow, 10:00 AM',
    },
    {
      id: 'dr3',
      name: 'Dr. Emily Rodriguez',
      specialization: 'Pediatrics',
      experience: 10,
      rating: 5.0,
      consultationFee: 35,
      avatar: 'https://placehold.co/200x200?text=Dr.+Emily+Rodriguez+Professional+Doctor+Portrait',
      totalConsultations: 3156,
      languages: ['English', 'Spanish', 'French'],
      nextAvailable: 'Today, 4:15 PM',
    },
  ];

  const testimonials = [
    {
      id: '1',
      name: 'Jennifer Smith',
      role: 'Patient',
      content: 'DocConnect made it so easy to get medical advice from home. The doctors are professional and caring.',
      rating: 5,
      avatar: 'https://placehold.co/100x100?text=Jennifer+Smith+Happy+Patient+Portrait',
    },
    {
      id: '2',
      name: 'Mark Williams',
      role: 'Patient',
      content: 'Quick, affordable, and reliable. I got the help I needed without the long wait times.',
      rating: 5,
      avatar: 'https://placehold.co/100x100?text=Mark+Williams+Satisfied+Patient+Portrait',
    },
    {
      id: '3',
      name: 'Dr. David Kumar',
      role: 'Doctor',
      content: 'The platform allows me to help more patients efficiently. Great interface and support.',
      rating: 5,
      avatar: 'https://placehold.co/100x100?text=Dr.+David+Kumar+Professional+Doctor+Portrait',
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Quality Healthcare
                <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  From Home
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Connect with certified doctors online for affordable consultations. 
                Get professional medical advice, prescriptions, and care from the comfort of your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/doctors">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                    Find a Doctor
                  </Button>
                </Link>
                <Link href="/auth/register-doctor">
                  <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">
                    Join as Doctor
                  </Button>
                </Link>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Certified Doctors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">50k+</div>
                  <div className="text-sm text-gray-600">Happy Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">$25+</div>
                  <div className="text-sm text-gray-600">Starting Fee</div>
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative lg:pl-8">
              <div className="relative">
                <img
                  src="https://placehold.co/600x400?text=Online+Doctor+Patient+Consultation+Video+Call+Modern+Interface"
                  alt="Online doctor consultation video call interface"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">124 doctors online</span>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold">4.9</div>
                    <div className="text-xs">Average Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section id="specializations" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Medical Specializations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find expert doctors across various medical specialties for comprehensive healthcare solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializations.map((spec) => (
              <Card key={spec.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{spec.icon}</div>
                    <Badge variant="secondary">{spec.doctorCount} doctors</Badge>
                  </div>
                  <CardTitle className="text-xl">{spec.name}</CardTitle>
                  <CardDescription>{spec.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Starting from</span>
                    <span className="text-lg font-semibold text-blue-600">${spec.averageFee}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Top Rated Doctors
            </h2>
            <p className="text-xl text-gray-600">
              Meet our highly rated and experienced doctors ready to help you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDoctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="text-center">
                  <img
                    src={doctor.avatar}
                    alt={`${doctor.name} - ${doctor.specialization} specialist`}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-xl">{doctor.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">
                    {doctor.specialization}
                  </CardDescription>
                  <div className="flex justify-center items-center space-x-1 mt-2">
                    {renderStars(Math.floor(doctor.rating))}
                    <span className="text-sm text-gray-600 ml-2">{doctor.rating} ({doctor.totalConsultations})</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">{doctor.experience} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Languages:</span>
                      <span className="font-medium text-sm">{doctor.languages.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Available:</span>
                      <span className="font-medium text-sm text-green-600">{doctor.nextAvailable}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <span className="text-2xl font-bold text-blue-600">${doctor.consultationFee}</span>
                      <Button size="sm">Book Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started with online healthcare in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-3xl">🔍</div>
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Find a Doctor</h3>
              <p className="text-gray-600">
                Browse through our network of certified doctors and choose the right specialist for your needs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-3xl">📅</div>
              </div>
              <h3 className="text-xl font-semibold mb-4">2. Book Appointment</h3>
              <p className="text-gray-600">
                Select a convenient time slot and book your consultation with just a few clicks.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-3xl">💻</div>
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Start Consultation</h3>
              <p className="text-gray-600">
                Connect with your doctor via video call, get professional advice, and receive prescriptions if needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from patients and doctors using our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar}
                      alt={`${testimonial.name} testimonial portrait`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of patients who trust DocConnect for their healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Sign Up as Patient
              </Button>
            </Link>
            <Link href="/auth/register-doctor">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg">
                Join as Doctor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                <span className="text-xl font-bold">DocConnect</span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting patients with qualified doctors for affordable, accessible healthcare solutions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">For Patients</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/doctors" className="hover:text-white transition-colors">Find Doctors</Link></li>
                <li><Link href="/specializations" className="hover:text-white transition-colors">Specializations</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">For Doctors</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/auth/register-doctor" className="hover:text-white transition-colors">Join Platform</Link></li>
                <li><Link href="/doctor-benefits" className="hover:text-white transition-colors">Benefits</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
                <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 DocConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;