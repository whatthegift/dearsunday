
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Calendar, Gift, Heart, MessageCircle, Plus, Settings, Users } from "lucide-react";
import SundayAvatar from "./SundayAvatar";
import SundayCharacter from "./SundayCharacter";

export default function StyleGuide() {
  const [openCollapsible, setOpenCollapsible] = useState(false);
  
  return (
    <div className="space-y-10 py-10">
      <div>
        <h1 className="mb-2">GiftYourThought Style Guide</h1>
        <p className="text-muted-foreground">A comprehensive visual design system for the GiftYourThought application.</p>
      </div>
      
      <Tabs defaultValue="colors">
        <TabsList className="mb-4">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="sunday">Sunday Character</TabsTrigger>
          <TabsTrigger value="animations">Animations</TabsTrigger>
        </TabsList>
        
        {/* Colors Tab */}
        <TabsContent value="colors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Primary Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="h-20 rounded-md bg-gift-yellow mb-2"></div>
                  <p className="font-medium">Sunday Yellow</p>
                  <p className="text-sm text-muted-foreground">#FFC72C</p>
                </div>
                <div>
                  <div className="h-20 rounded-md bg-gift-yellow-light mb-2"></div>
                  <p className="font-medium">Yellow Light</p>
                  <p className="text-sm text-muted-foreground">#FFD75F</p>
                </div>
                <div>
                  <div className="h-20 rounded-md bg-gift-yellow-lighter mb-2"></div>
                  <p className="font-medium">Yellow Lighter</p>
                  <p className="text-sm text-muted-foreground">#FFEBA6</p>
                </div>
                <div>
                  <div className="h-20 rounded-md bg-gift-yellow-dark mb-2"></div>
                  <p className="font-medium">Yellow Dark</p>
                  <p className="text-sm text-muted-foreground">#E6B000</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Secondary Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <div className="h-20 rounded-md bg-gift-lavender mb-2"></div>
                  <p className="font-medium">Lavender</p>
                  <p className="text-sm text-muted-foreground">#E5DEFF</p>
                </div>
                <div>
                  <div className="h-20 rounded-md bg-gift-sage mb-2"></div>
                  <p className="font-medium">Sage</p>
                  <p className="text-sm text-muted-foreground">#D8EAD3</p>
                </div>
                <div>
                  <div className="h-20 rounded-md bg-gift-cream mb-2"></div>
                  <p className="font-medium">Cream</p>
                  <p className="text-sm text-muted-foreground">#FEF7CD</p>
                </div>
                <div>
                  <div className="h-20 rounded-md bg-gift-peach mb-2"></div>
                  <p className="font-medium">Peach</p>
                  <p className="text-sm text-muted-foreground">#FDE1D3</p>
                </div>
                <div>
                  <div className="h-20 rounded-md bg-gift-blush mb-2"></div>
                  <p className="font-medium">Blush</p>
                  <p className="text-sm text-muted-foreground">#FFDEE2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Chat Bubbles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="h-20 rounded-md bg-gift-sunday-bubble mb-2"></div>
                  <p className="font-medium">Sunday Bubble</p>
                  <p className="text-sm text-muted-foreground">#FFF8E1</p>
                </div>
                <div>
                  <div className="h-20 rounded-md bg-gift-user-bubble mb-2"></div>
                  <p className="font-medium">User Bubble</p>
                  <p className="text-sm text-muted-foreground">#E3F2FD</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Accent Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="h-20 rounded-md bg-gift-coral mb-2"></div>
                  <p className="font-medium">Coral</p>
                  <p className="text-sm text-muted-foreground">#FF7E67</p>
                </div>
                <div>
                  <div className="h-20 rounded-md bg-gift-teal mb-2"></div>
                  <p className="font-medium">Teal</p>
                  <p className="text-sm text-muted-foreground">#5DBEA3</p>
                </div>
                <div>
                  <div className="h-20 rounded-md bg-gift-purple mb-2"></div>
                  <p className="font-medium">Purple</p>
                  <p className="text-sm text-muted-foreground">#9C89B8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Status Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="h-20 rounded-md bg-status-success mb-2"></div>
                  <p className="font-medium">Success</p>
                  <p className="text-sm text-muted-foreground">#66BB6A</p>
                </div>
                <div>
                  <div className="h-20 rounded-md bg-status-warning mb-2"></div>
                  <p className="font-medium">Warning</p>
                  <p className="text-sm text-muted-foreground">#FFA726</p>
                </div>
                <div>
                  <div className="h-20 rounded-md bg-status-error mb-2"></div>
                  <p className="font-medium">Error</p>
                  <p className="text-sm text-muted-foreground">#EF5350</p>
                </div>
                <div>
                  <div className="h-20 rounded-md bg-status-info mb-2"></div>
                  <p className="font-medium">Info</p>
                  <p className="text-sm text-muted-foreground">#29B6F6</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Typography Tab */}
        <TabsContent value="typography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Font Families</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-2">Poppins - Headings & Buttons</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-poppins text-2xl font-bold">Poppins Bold</p>
                  <p className="font-poppins text-xl font-semibold">Poppins SemiBold</p>
                  <p className="font-poppins text-lg font-medium">Poppins Medium</p>
                  <p className="font-poppins text-base">Poppins Regular</p>
                  <p className="font-poppins text-sm font-light">Poppins Light</p>
                </div>
              </div>
              
              <div>
                <h3 className="mb-2">Nunito - Body Text & Interface</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-nunito text-lg font-bold">Nunito Bold</p>
                  <p className="font-nunito text-lg font-semibold">Nunito SemiBold</p>
                  <p className="font-nunito text-base font-medium">Nunito Medium</p>
                  <p className="font-nunito text-base">Nunito Regular</p>
                  <p className="font-nunito text-sm font-light">Nunito Light</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Heading Hierarchy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h1>Heading 1 (2.5rem / 40px)</h1>
                <p className="text-sm text-muted-foreground">Font: Poppins Bold, Line Height: 1.2, Tracking: -0.02em</p>
              </div>
              <div>
                <h2>Heading 2 (2rem / 32px)</h2>
                <p className="text-sm text-muted-foreground">Font: Poppins SemiBold, Line Height: 1.3, Tracking: -0.01em</p>
              </div>
              <div>
                <h3>Heading 3 (1.5rem / 24px)</h3>
                <p className="text-sm text-muted-foreground">Font: Poppins SemiBold, Line Height: 1.4</p>
              </div>
              <div>
                <h4>Heading 4 (1.25rem / 20px)</h4>
                <p className="text-sm text-muted-foreground">Font: Poppins SemiBold, Line Height: 1.5</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Body Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-lg">Large Body Text (1.125rem / 18px)</p>
                <p className="text-sm text-muted-foreground">Font: Nunito Regular, Line Height: 1.6</p>
              </div>
              <div>
                <p>Regular Body Text (1rem / 16px)</p>
                <p className="text-sm text-muted-foreground">Font: Nunito Regular, Line Height: 1.6</p>
              </div>
              <div>
                <p className="text-sm">Small Body Text (0.875rem / 14px)</p>
                <p className="text-sm text-muted-foreground">Font: Nunito Regular, Line Height: 1.6</p>
              </div>
              <div>
                <p className="text-xs">Micro Text (0.75rem / 12px)</p>
                <p className="text-sm text-muted-foreground">Font: Nunito Medium, Line Height: 1.5</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Special Text Treatments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="mb-2">Pull Quote</h4>
                <blockquote>
                  This is a special pull quote that stands out from the regular text content. It's designed to highlight important messages.
                </blockquote>
              </div>
              
              <div>
                <h4 className="mb-2">Lists</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium mb-2">Unordered List</p>
                    <ul>
                      <li>List item one</li>
                      <li>List item two</li>
                      <li>List item three with some longer text to see how it wraps</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Ordered List</p>
                    <ol>
                      <li>First item</li>
                      <li>Second item</li>
                      <li>Third item with some longer text to see how it wraps</li>
                    </ol>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="mb-2">Link Styling</h4>
                <p>This is a paragraph with a <a href="#">styled link</a> inside it. The link has a yellow color and underline on hover.</p>
              </div>
              
              <div>
                <h4 className="mb-2">Error & Success Messages</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="error-message">This is an error message.</p>
                  </div>
                  <div>
                    <p className="success-message">This is a success message.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Components Tab */}
        <TabsContent value="components" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Button System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-2">Primary Buttons</h4>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button>Default Primary</Button>
                    <Button disabled>Disabled Primary</Button>
                    <Button size="sm">Small Primary</Button>
                    <Button size="lg">Large Primary</Button>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      With Icon
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-2">Secondary Buttons</h4>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="secondary" disabled>Disabled</Button>
                    <Button variant="secondary" size="sm">Small</Button>
                    <Button variant="secondary" size="lg">Large</Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-2">Outline Buttons</h4>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button variant="outline">Outline</Button>
                    <Button variant="outline" disabled>Disabled</Button>
                    <Button variant="outline" size="sm">Small</Button>
                    <Button variant="outline" size="lg">Large</Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-2">Ghost/Link Buttons</h4>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link Style</Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-2">Icon Buttons</h4>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button size="icon" variant="default">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Card System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-4">Standard Cards</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>This is a standard card with title and content.</p>
                      </CardContent>
                    </Card>
                    
                    <div className="gift-card">
                      <h4 className="font-medium mb-2">Gift Card</h4>
                      <p className="text-sm text-muted-foreground mb-2">Custom gift card with shadow effect</p>
                      <Button size="sm" variant="outline">View Gift</Button>
                    </div>
                    
                    <div className="date-card">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Special Date</p>
                          <p className="text-sm text-muted-foreground">April 15, 2025</p>
                        </div>
                        <div>
                          <span className="text-sm text-primary font-medium">5 days left</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-4">Chat Bubbles</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2 max-w-md">
                      <SundayAvatar size="sm" />
                      <div className="sunday-bubble">
                        <p>Hi there! I'm Sunday, your gifting assistant. How can I help you today?</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end max-w-md ml-auto">
                      <div className="user-bubble">
                        <p>I need help finding a gift for my friend's birthday!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Form Elements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="default-input">Default Input</Label>
                    <Input id="default-input" placeholder="Type something..." />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="disabled-input">Disabled Input</Label>
                      <Input id="disabled-input" placeholder="Disabled" disabled />
                    </div>
                    <div>
                      <Label htmlFor="with-icon" className="mb-1">With Error</Label>
                      <Input id="with-icon" className="border-status-error" />
                      <p className="error-message">This field is required</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-4">Selection Controls</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Accept terms and conditions
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="emails" defaultChecked />
                        <label
                          htmlFor="emails"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Email me about gift ideas
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-4">Chat Input</h4>
                  <div className="flex items-center space-x-2">
                    <Input 
                      placeholder="Type your message..." 
                      className="flex-1"
                    />
                    <Button size="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="m22 2-7 20-4-9-9-4Z" />
                        <path d="M22 2 11 13" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Sunday Character Tab */}
        <TabsContent value="sunday" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sunday Character</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h4 className="mb-4">Character Moods</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6 justify-items-center">
                    <div className="text-center">
                      <SundayCharacter mood="neutral" size="medium" />
                      <p className="mt-2 font-medium">Neutral</p>
                    </div>
                    <div className="text-center">
                      <SundayCharacter mood="thinking" size="medium" />
                      <p className="mt-2 font-medium">Thinking</p>
                    </div>
                    <div className="text-center">
                      <SundayCharacter mood="excited" size="medium" />
                      <p className="mt-2 font-medium">Excited</p>
                    </div>
                    <div className="text-center">
                      <SundayCharacter mood="listening" size="medium" />
                      <p className="mt-2 font-medium">Listening</p>
                    </div>
                    <div className="text-center">
                      <SundayCharacter mood="celebrating" size="medium" />
                      <p className="mt-2 font-medium">Celebrating</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-4">Size Variations</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center items-end">
                    <div className="text-center">
                      <SundayCharacter size="icon" />
                      <p className="mt-2 text-sm">Icon (32px)</p>
                    </div>
                    <div className="text-center">
                      <SundayCharacter size="mini" />
                      <p className="mt-2 text-sm">Mini (48px)</p>
                    </div>
                    <div className="text-center">
                      <SundayCharacter size="medium" />
                      <p className="mt-2 text-sm">Medium (80px)</p>
                    </div>
                    <div className="text-center">
                      <SundayCharacter size="large" />
                      <p className="mt-2 text-sm">Large (128px)</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-4">Avatar Integration</h4>
                  <div className="flex flex-wrap gap-6 justify-center">
                    <div className="text-center">
                      <SundayAvatar size="sm" animated={true} />
                      <p className="mt-2 text-sm">Small Avatar</p>
                    </div>
                    <div className="text-center">
                      <SundayAvatar size="md" animated={true} />
                      <p className="mt-2 text-sm">Medium Avatar</p>
                    </div>
                    <div className="text-center">
                      <SundayAvatar size="lg" animated={true} />
                      <p className="mt-2 text-sm">Large Avatar</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Animations Tab */}
        <TabsContent value="animations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Animation Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h4 className="mb-4">Element Entrance Animations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="animated-entry">
                      <CardContent className="p-4">
                        <p className="text-center py-6">Fade In</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="scale-entry">
                      <CardContent className="p-4">
                        <p className="text-center py-6">Scale In</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bounce-entry">
                      <CardContent className="p-4">
                        <p className="text-center py-6">Bounce In</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-4">Continuous Animations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 justify-items-center">
                    <div className="text-center">
                      <div className="animate-float h-16 w-16 bg-gift-yellow rounded-full"></div>
                      <p className="mt-2">Float</p>
                    </div>
                    <div className="text-center">
                      <div className="animate-pulse-soft h-16 w-16 bg-gift-lavender rounded-full"></div>
                      <p className="mt-2">Pulse</p>
                    </div>
                    <div className="text-center">
                      <div className="animate-bounce-subtle h-16 w-16 bg-gift-sage rounded-full"></div>
                      <p className="mt-2">Bounce</p>
                    </div>
                    <div className="text-center">
                      <div className="animate-spin-slow h-16 w-16 border-4 border-gift-coral border-t-transparent rounded-full"></div>
                      <p className="mt-2">Spin</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-4">Interactive Elements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Collapsible
                        open={openCollapsible}
                        onOpenChange={setOpenCollapsible}
                        className="w-full"
                      >
                        <CollapsibleTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            Toggle Content
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`h-4 w-4 transition-transform ${
                                openCollapsible ? "rotate-180" : ""
                              }`}
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2">
                          <Card>
                            <CardContent className="p-4">
                              <p>This content expands and collapses with a smooth animation.</p>
                            </CardContent>
                          </Card>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                    
                    <div className="justify-center flex flex-col">
                      <h5 className="mb-2 text-sm font-medium">Loading Indicator</h5>
                      <div className="h-6 w-full loading-shimmer rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
