import React, { useState } from 'react';
import { Check, Copy, Palette, Type, Layers, Grid3x3, Sparkles, Eye } from 'lucide-react';
import { Button } from './components/ui/button';

interface ColorToken {
  name: string;
  variable: string;
  light: string;
  dark: string;
  description: string;
}

interface GlassEffect {
  name: string;
  blur: string;
  saturate: string;
  opacity: string;
  background: string;
  border: string;
  description: string;
}

const DesignSystem = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'colors' | 'glass' | 'typography' | 'spacing' | 'components'>('colors');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  // Color System
  const colorTokens: ColorToken[] = [
    { name: 'Background', variable: '--background', light: '#ffffff', dark: 'oklch(0.145 0 0)', description: 'Main canvas background' },
    { name: 'Foreground', variable: '--foreground', light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)', description: 'Primary text color' },
    { name: 'Primary', variable: '--primary', light: '#030213', dark: 'oklch(0.985 0 0)', description: 'Primary brand color' },
    { name: 'Secondary', variable: '--secondary', light: 'oklch(0.95 0.0058 264.53)', dark: 'oklch(0.269 0 0)', description: 'Secondary elements' },
    { name: 'Muted', variable: '--muted', light: '#ececf0', dark: 'oklch(0.269 0 0)', description: 'Subtle backgrounds' },
    { name: 'Muted Foreground', variable: '--muted-foreground', light: '#717182', dark: 'oklch(0.708 0 0)', description: 'Subtle text' },
    { name: 'Accent', variable: '--accent', light: '#e9ebef', dark: 'oklch(0.269 0 0)', description: 'Accent backgrounds' },
    { name: 'Destructive', variable: '--destructive', light: '#d4183d', dark: 'oklch(0.396 0.141 25.723)', description: 'Error/delete actions' },
    { name: 'Border', variable: '--border', light: 'rgba(0, 0, 0, 0.1)', dark: 'oklch(0.269 0 0)', description: 'Borders and dividers' },
  ];

  // Glass Effects (The LALINE signature!)
  const glassEffects: GlassEffect[] = [
    {
      name: 'Signature Frost',
      blur: '60px',
      saturate: '150%',
      opacity: '0.7',
      background: 'rgba(255, 255, 255, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      description: 'The hero frosted glass effect - our signature look'
    },
    {
      name: 'Subtle Frost',
      blur: '40px',
      saturate: '120%',
      opacity: '0.5',
      background: 'rgba(255, 255, 255, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      description: 'Lighter glass for layered elements'
    },
    {
      name: 'Deep Frost (Dark)',
      blur: '60px',
      saturate: '150%',
      opacity: '0.2',
      background: 'rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      description: 'Dark mode glass effect'
    },
    {
      name: 'Navigation Glass',
      blur: '40px',
      saturate: '120%',
      opacity: '0.8',
      background: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      description: 'More opaque for navigation/UI elements'
    }
  ];

  // Typography System
  const typographyTokens = [
    { element: 'h1', size: 'var(--text-2xl)', weight: '500', lineHeight: '1.5', use: 'Page titles' },
    { element: 'h2', size: 'var(--text-xl)', weight: '500', lineHeight: '1.5', use: 'Section headers' },
    { element: 'h3', size: 'var(--text-lg)', weight: '500', lineHeight: '1.5', use: 'Card titles' },
    { element: 'h4', size: 'var(--text-base)', weight: '500', lineHeight: '1.5', use: 'Subsections' },
    { element: 'body', size: 'var(--text-base)', weight: '400', lineHeight: '1.5', use: 'Body text' },
    { element: 'button', size: 'var(--text-base)', weight: '500', lineHeight: '1.5', use: 'Interactive elements' },
  ];

  // Spacing System
  const spacingTokens = [
    { name: 'xs', value: '0.5rem (8px)', use: 'Tight spacing, icon gaps' },
    { name: 'sm', value: '0.75rem (12px)', use: 'Small gaps, compact layouts' },
    { name: 'md', value: '1rem (16px)', use: 'Default spacing' },
    { name: 'lg', value: '1.5rem (24px)', use: 'Section spacing' },
    { name: 'xl', value: '2rem (32px)', use: 'Large gaps between sections' },
    { name: '2xl', value: '3rem (48px)', use: 'Major section dividers' },
    { name: '3xl', value: '4rem (64px)', use: 'Hero spacing, dramatic gaps' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-[40px] backdrop-saturate-[120%] bg-white/80 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl tracking-tight mb-2">LALINE Design System</h1>
              <p className="text-muted-foreground">Authority • Constraint • Pacing • Silence</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-[60px] backdrop-saturate-[150%] bg-white/70 dark:bg-black/20 border border-white/30">
              <Sparkles className="size-4 text-purple-600" />
              <span className="text-sm">Good Enough to Eat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-[97px] z-40 border-b border-border/40 backdrop-blur-[40px] backdrop-saturate-[120%] bg-white/60 dark:bg-black/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-1">
            {[
              { id: 'colors', label: 'Colors', icon: Palette },
              { id: 'glass', label: 'Glass Effects', icon: Eye },
              { id: 'typography', label: 'Typography', icon: Type },
              { id: 'spacing', label: 'Spacing', icon: Grid3x3 },
              { id: 'components', label: 'Components', icon: Layers },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="size-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* COLORS TAB */}
        {activeTab === 'colors' && (
          <div className="space-y-8">
            <div>
              <h2 className="mb-2">Color Tokens</h2>
              <p className="text-muted-foreground mb-6">OS-neutral, sophisticated palette with automatic dark mode</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {colorTokens.map((token) => (
                <div
                  key={token.variable}
                  className="rounded-lg backdrop-blur-[40px] backdrop-saturate-[120%] bg-white/70 dark:bg-white/5 border border-white/30 dark:border-white/10 p-5 hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="mb-1">{token.name}</h3>
                      <code className="text-xs text-muted-foreground">{token.variable}</code>
                    </div>
                    <button
                      onClick={() => copyToClipboard(token.variable, token.name)}
                      className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      title="Copy variable name"
                    >
                      {copiedToken === token.name ? (
                        <Check className="size-4 text-green-600" />
                      ) : (
                        <Copy className="size-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="size-10 rounded-md border border-border shadow-sm"
                        style={{ background: token.light }}
                      />
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground">Light</div>
                        <code className="text-xs">{token.light}</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="size-10 rounded-md border border-border shadow-sm"
                        style={{ background: token.dark }}
                      />
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground">Dark</div>
                        <code className="text-xs">{token.dark}</code>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{token.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GLASS EFFECTS TAB */}
        {activeTab === 'glass' && (
          <div className="space-y-8">
            <div>
              <h2 className="mb-2">Frosted Glass Effects</h2>
              <p className="text-muted-foreground mb-6">
                The signature "good enough to eat" aesthetic - our secret sauce is <strong>blur(60px) + saturate(150%)</strong>
              </p>
            </div>

            <div className="space-y-6">
              {glassEffects.map((effect) => (
                <div key={effect.name} className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="mb-1">{effect.name}</h3>
                      <p className="text-sm text-muted-foreground">{effect.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(
                        `backdrop-filter: blur(${effect.blur}) saturate(${effect.saturate});
background: ${effect.background};
border: ${effect.border};`,
                        effect.name
                      )}
                      className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      title="Copy CSS"
                    >
                      {copiedToken === effect.name ? (
                        <Check className="size-4 text-green-600" />
                      ) : (
                        <Copy className="size-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>

                  {/* Live Preview */}
                  <div className="relative h-48 rounded-xl overflow-hidden">
                    {/* Background image simulation */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
                    
                    {/* Glass card */}
                    <div className="absolute inset-8 rounded-lg shadow-xl p-6 flex items-center justify-center"
                      style={{
                        backdropFilter: `blur(${effect.blur}) saturate(${effect.saturate})`,
                        WebkitBackdropFilter: `blur(${effect.blur}) saturate(${effect.saturate})`,
                        background: effect.background,
                        border: effect.border,
                      }}
                    >
                      <div className="text-center">
                        <Eye className="size-8 mx-auto mb-2 text-white dark:text-black" />
                        <p className="text-white dark:text-black">Live Preview</p>
                      </div>
                    </div>
                  </div>

                  {/* Code Tokens */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="rounded-lg bg-black/5 dark:bg-white/5 p-3">
                      <div className="text-xs text-muted-foreground mb-1">Blur</div>
                      <code className="text-sm">{effect.blur}</code>
                    </div>
                    <div className="rounded-lg bg-black/5 dark:bg-white/5 p-3">
                      <div className="text-xs text-muted-foreground mb-1">Saturate</div>
                      <code className="text-sm">{effect.saturate}</code>
                    </div>
                    <div className="rounded-lg bg-black/5 dark:bg-white/5 p-3">
                      <div className="text-xs text-muted-foreground mb-1">Opacity</div>
                      <code className="text-sm">{effect.opacity}</code>
                    </div>
                    <div className="rounded-lg bg-black/5 dark:bg-white/5 p-3">
                      <div className="text-xs text-muted-foreground mb-1">Background</div>
                      <code className="text-xs">{effect.background}</code>
                    </div>
                  </div>

                  {/* CSS Code Block */}
                  <div className="rounded-lg bg-gray-900 dark:bg-black p-4">
                    <pre className="text-xs text-green-400 overflow-x-auto">
{`.glass-effect {
  backdrop-filter: blur(${effect.blur}) saturate(${effect.saturate});
  -webkit-backdrop-filter: blur(${effect.blur}) saturate(${effect.saturate});
  background: ${effect.background};
  border: ${effect.border};
}`}
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            {/* Figma Tips */}
            <div className="rounded-xl backdrop-blur-[40px] backdrop-saturate-[120%] bg-purple-500/10 border border-purple-500/20 p-6 mt-8">
              <h3 className="mb-3 flex items-center gap-2">
                <Sparkles className="size-5 text-purple-600" />
                Figma Setup Tips
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Create Effect Styles with <strong>Layer Blur: 60</strong> and <strong>Background Blur: 60</strong></li>
                <li>• Use <strong>white fills at 70% opacity</strong> for light mode glass</li>
                <li>• Add <strong>1px inner borders at 30% white</strong> for the glass edge</li>
                <li>• Enable <strong>Advanced Prototyping</strong> to preview backdrop effects</li>
                <li>• Save as Component with variants: Default, Hover, Active</li>
              </ul>
            </div>
          </div>
        )}

        {/* TYPOGRAPHY TAB */}
        {activeTab === 'typography' && (
          <div className="space-y-8">
            <div>
              <h2 className="mb-2">Typography System</h2>
              <p className="text-muted-foreground mb-6">Clean, readable hierarchy with consistent weights</p>
            </div>

            <div className="space-y-6">
              {typographyTokens.map((token) => (
                <div
                  key={token.element}
                  className="rounded-lg backdrop-blur-[40px] backdrop-saturate-[120%] bg-white/70 dark:bg-white/5 border border-white/30 dark:border-white/10 p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div
                        style={{
                          fontSize: token.size === 'var(--text-2xl)' ? '1.5rem' :
                                   token.size === 'var(--text-xl)' ? '1.25rem' :
                                   token.size === 'var(--text-lg)' ? '1.125rem' : '1rem',
                          fontWeight: token.weight,
                          lineHeight: token.lineHeight,
                        }}
                      >
                        The quick brown fox jumps over the lazy dog
                      </div>
                    </div>
                    <div className="lg:w-64 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Element</span>
                        <code className="bg-black/5 dark:bg-white/5 px-2 py-1 rounded">{token.element}</code>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Size</span>
                        <code className="bg-black/5 dark:bg-white/5 px-2 py-1 rounded text-xs">{token.size}</code>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Weight</span>
                        <code className="bg-black/5 dark:bg-white/5 px-2 py-1 rounded">{token.weight}</code>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Line Height</span>
                        <code className="bg-black/5 dark:bg-white/5 px-2 py-1 rounded">{token.lineHeight}</code>
                      </div>
                      <div className="pt-2 border-t border-border/40">
                        <span className="text-xs text-muted-foreground">{token.use}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SPACING TAB */}
        {activeTab === 'spacing' && (
          <div className="space-y-8">
            <div>
              <h2 className="mb-2">Spacing Scale</h2>
              <p className="text-muted-foreground mb-6">Consistent spacing system based on 8px grid</p>
            </div>

            <div className="space-y-4">
              {spacingTokens.map((token) => (
                <div
                  key={token.name}
                  className="rounded-lg backdrop-blur-[40px] backdrop-saturate-[120%] bg-white/70 dark:bg-white/5 border border-white/30 dark:border-white/10 p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="lg:w-48">
                      <code className="text-lg">{token.name}</code>
                      <div className="text-sm text-muted-foreground mt-1">{token.value}</div>
                    </div>
                    <div className="flex-1">
                      <div className="h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded"
                        style={{ width: token.value.split(' ')[0] }}
                      />
                    </div>
                    <div className="lg:w-64 text-sm text-muted-foreground">
                      {token.use}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl backdrop-blur-[40px] backdrop-saturate-[120%] bg-blue-500/10 border border-blue-500/20 p-6 mt-8">
              <h3 className="mb-3">Tailwind Classes</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['gap-2', 'gap-4', 'gap-6', 'gap-8', 'p-4', 'p-6', 'p-8', 'p-12'].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => copyToClipboard(cls, cls)}
                    className="text-left rounded-lg bg-white/50 dark:bg-black/20 p-3 hover:bg-white/80 dark:hover:bg-black/40 transition-colors"
                  >
                    <code className="text-sm">{cls}</code>
                    {copiedToken === cls && <Check className="size-3 inline ml-2 text-green-600" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* COMPONENTS TAB */}
        {activeTab === 'components' && (
          <div className="space-y-8">
            <div>
              <h2 className="mb-2">Component Library</h2>
              <p className="text-muted-foreground mb-6">Interactive components showcasing the LALINE aesthetic</p>
            </div>

            {/* Buttons */}
            <div className="rounded-xl backdrop-blur-[40px] backdrop-saturate-[120%] bg-white/70 dark:bg-white/5 border border-white/30 dark:border-white/10 p-8">
              <h3 className="mb-6">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Delete</Button>
                <Button variant="default" size="sm">Small</Button>
                <Button variant="default" size="lg">Large</Button>
              </div>
            </div>

            {/* Glass Cards */}
            <div className="rounded-xl backdrop-blur-[40px] backdrop-saturate-[120%] bg-white/70 dark:bg-white/5 border border-white/30 dark:border-white/10 p-8">
              <h3 className="mb-6">Glass Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg backdrop-blur-[60px] backdrop-saturate-[150%] bg-white/70 dark:bg-white/5 border border-white/30 dark:border-white/10 p-6">
                  <h4 className="mb-2">Signature Frost Card</h4>
                  <p className="text-sm text-muted-foreground">
                    The hero card style with maximum blur and saturation for that "good enough to eat" feel.
                  </p>
                </div>
                <div className="rounded-lg backdrop-blur-[40px] backdrop-saturate-[120%] bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 p-6">
                  <h4 className="mb-2">Subtle Frost Card</h4>
                  <p className="text-sm text-muted-foreground">
                    A lighter touch for nested elements or less prominent content.
                  </p>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="rounded-xl backdrop-blur-[40px] backdrop-saturate-[120%] bg-white/70 dark:bg-white/5 border border-white/30 dark:border-white/10 p-8">
              <h3 className="mb-6">Form Elements</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block mb-2">Input Field</label>
                  <input
                    type="text"
                    placeholder="Enter text..."
                    className="w-full px-4 py-2 rounded-lg bg-input-background border border-border focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block mb-2">Textarea</label>
                  <textarea
                    placeholder="Enter longer text..."
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg bg-input-background border border-border focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="rounded-xl backdrop-blur-[40px] backdrop-saturate-[120%] bg-white/70 dark:bg-white/5 border border-white/30 dark:border-white/10 p-8">
              <h3 className="mb-6">Navigation Bar</h3>
              <div className="rounded-lg backdrop-blur-[40px] backdrop-saturate-[120%] bg-white/80 dark:bg-black/20 border border-white/40 dark:border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <span>AURELIA</span>
                    <nav className="flex gap-4 text-sm text-muted-foreground">
                      <a href="#" className="hover:text-foreground transition-colors">Projects</a>
                      <a href="#" className="hover:text-foreground transition-colors">Tasks</a>
                      <a href="#" className="hover:text-foreground transition-colors">Journal</a>
                      <a href="#" className="hover:text-foreground transition-colors">Goals</a>
                    </nav>
                  </div>
                  <Button variant="ghost" size="sm">Settings</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border/40 backdrop-blur-[40px] backdrop-saturate-[120%] bg-white/60 dark:bg-black/10 py-8">
        <div className="max-w-7xl mx-auto px-8 text-center text-sm text-muted-foreground">
          <p>LALINE Design System • Authority, Constraint, Pacing, Silence</p>
          <p className="mt-2">Built for AUREL & AURELIA • 2027 Launch</p>
        </div>
      </div>
    </div>
  );
};

export default DesignSystem;
