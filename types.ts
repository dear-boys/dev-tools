
import React from 'react';

export interface Tool {
  path: string;
  name: string;
  component: React.ComponentType;
  icon: React.ComponentType<{ className?: string }>;
}
