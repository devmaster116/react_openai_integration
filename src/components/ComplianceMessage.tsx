import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ComplianceMessage() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md px-4 py-2 shadow-lg z-50 flex items-center justify-center">
      <div className="flex items-center gap-2 max-w-screen-xl mx-auto">
        <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
        <p className="text-xs text-white whitespace-nowrap">
          ZADI makes mistakes and can be corrected. This experimental version is being tested by ZAD.AI Ltd - London - UK. For all enquiries, email: ai@zadi.ai
        </p>
      </div>
    </div>
  );
}