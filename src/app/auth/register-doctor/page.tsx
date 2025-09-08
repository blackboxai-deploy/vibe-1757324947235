'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../components/Auth/AuthProvider';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Badge } from '../../../components/ui/badge';

const RegisterDoctorPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    specialization: '',
    licenseNumber: '',
    experience: '',
    bio: '',
    consultationFee: '',
  });
  const [qualifications, setQualifications] = useState<string[]>(['']);
  const [languages, setLanguages] = useState<string[]>(['English']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const specializations = [
    'General Medicine',
    'Cardiology',
    'Dermatology',
    'Psychiatry',
    'Pediatrics',
    'Gynecology',
    'Orthopedics',
    'Neurology',
    'Ophthalmology',
    'ENT (Otolaryngology)',
    'Endocrinology',
    'Gastroenterology',
    'Pulmonology',
    'Nephrology',
    'Oncology',
    'Radiology',
    'Anesthesiology',
    'Pathology',
    'Emergency Medicine',
    'Family Medicine'
  ];

  const availableLanguages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
    'Dutch', 'Arabic', 'Hindi', 'Mandarin', 'Japanese', 'Korean', 
    'Russian', 'Turkish', 'Polish', 'Swedish', 'Norwegian'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleQualificationChange = (index: number, value: string) => {
    const newQualifications = [...qualifications];
    newQualifications[index] = value;
    setQualifications(newQualifications);
  };

  const addQualification = () => {
    setQualifications([...qualifications, '']);
  };

  const removeQualification = (index: number) => {
    if (qualifications.length > 1) {
      setQualifications(qualifications.filter((_, i) => i !== index));
    }
  };

  const toggleLanguage = (language: string) => {
    if (languages.includes(language)) {
      setLanguages(languages.filter(l => l !== language));
    } else {
      setLanguages([...languages, language]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (formData.bio.length < 50) {
      setError('Bio must be at least 50 characters long');
      return;
    }

    if (qualifications.filter(q => q.trim()).length === 0) {
      setError('At least one qualification is required');
      return;
    }

    if (languages.length === 0) {
      setError('At least one language must be selected');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: 'doctor'
      });
      router.push('/dashboard/doctor');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-600 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              DocConnect
            </span>
          </Link>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-900">Join as Healthcare Provider</CardTitle>
            <CardDescription className="text-gray-600">
              Connect with patients and grow your practice online
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Dr. Your Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="doctor@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="h-11"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, specialization: value }))}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select your specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          {specializations.map((spec) => (
                            <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">Medical License Number</Label>
                      <Input
                        id="licenseNumber"
                        name="licenseNumber"
                        type="text"
                        placeholder="Your medical license number"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        name="experience"
                        type="number"
                        placeholder="5"
                        min="0"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="consultationFee">Consultation Fee (USD)</Label>
                      <Input
                        id="consultationFee"
                        name="consultationFee"
                        type="number"
                        placeholder="50"
                        min="1"
                        value={formData.consultationFee}
                        onChange={handleChange}
                        required
                        className="h-11"
                      />
                    </div>
                  </div>

                  {/* Qualifications */}
                  <div className="space-y-2">
                    <Label>Qualifications</Label>
                    {qualifications.map((qualification, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder={`Qualification ${index + 1} (e.g., MD, PhD, MBBS)`}
                          value={qualification}
                          onChange={(e) => handleQualificationChange(index, e.target.value)}
                          className="h-11"
                        />
                        {qualifications.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeQualification(index)}
                            className="px-3"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addQualification}
                      className="w-full"
                    >
                      Add Another Qualification
                    </Button>
                  </div>

                  {/* Languages */}
                  <div className="space-y-2">
                    <Label>Languages Spoken</Label>
                    <div className="flex flex-wrap gap-2">
                      {availableLanguages.map((language) => (
                        <Badge
                          key={language}
                          variant={languages.includes(language) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleLanguage(language)}
                        >
                          {language}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">Click to select/deselect languages</p>
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Tell patients about your background, experience, and approach to healthcare (minimum 50 characters)..."
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="resize-none"
                      required
                    />
                    <p className="text-sm text-gray-500">{formData.bio.length}/50 minimum characters</p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Verification Process</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• Your credentials will be verified within 24-48 hours</li>
                  <li>• You'll receive an email confirmation once approved</li>
                  <li>• All information provided must be accurate and verifiable</li>
                  <li>• Your license will be verified with relevant medical boards</li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Submit Application'}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
              
              <p className="text-gray-600">
                Looking for medical care?{' '}
                <Link href="/auth/register" className="text-blue-600 hover:underline font-medium">
                  Register as Patient
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="mt-8 bg-white/50 backdrop-blur rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Why join DocConnect?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <ul className="space-y-2">
              <li>✓ Flexible scheduling and remote consultations</li>
              <li>✓ Competitive consultation fees</li>
              <li>✓ Secure, HIPAA-compliant platform</li>
              <li>✓ Digital prescription and record management</li>
            </ul>
            <ul className="space-y-2">
              <li>✓ Growing patient base across multiple specialties</li>
              <li>✓ 24/7 technical support</li>
              <li>✓ Marketing and practice growth tools</li>
              <li>✓ Streamlined billing and payment processing</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Secure • Private • HIPAA Compliant</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterDoctorPage;