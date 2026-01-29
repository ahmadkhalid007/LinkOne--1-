import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
              Streamlined Student Services
            </div>
            <h1 className="text-gray-900 mb-6">
              Comprehensive Web-Based System
            </h1>
            <p className="text-gray-600 mb-8">
              A comprehensive web-based system that automates and streamlines student applications, 
              approvals, and administrative processes with efficiency and transparency.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" size={20} />
                <span className="text-gray-700">Automated approval workflows</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" size={20} />
                <span className="text-gray-700">Real-time status tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" size={20} />
                <span className="text-gray-700">Multi-level approvals system</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" size={20} />
                <span className="text-gray-700">Conflict detection & resolution</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={onGetStarted}>
                Get Started
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-blue-600 mb-2">4</div>
              <p className="text-gray-600">Automated Modules</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-purple-600 mb-2">24/7</div>
              <p className="text-gray-600">System Availability</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-green-600 mb-2">100%</div>
              <p className="text-gray-600">Digital Process</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-orange-600 mb-2">Fast</div>
              <p className="text-gray-600">Approval Times</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
