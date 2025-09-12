-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create relationships table (people you give gifts to)
CREATE TABLE public.relationships (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relationship_type TEXT,
  email TEXT,
  phone TEXT,
  birthday DATE,
  photo_url TEXT,
  personality_traits TEXT[],
  likes TEXT[],
  dislikes TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create anniversaries table (important dates)
CREATE TABLE public.anniversaries (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  relationship_id UUID NOT NULL REFERENCES public.relationships(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  recurring BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create occasions table
CREATE TABLE public.occasions (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  relationship_id UUID REFERENCES public.relationships(id) ON DELETE CASCADE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create gift_ideas table
CREATE TABLE public.gift_ideas (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  estimated_price JSONB, -- {min: number, max: number}
  category TEXT,
  tags TEXT[],
  url TEXT,
  photo_url TEXT,
  save_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create gifts table (actual gifts)
CREATE TABLE public.gifts (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES public.relationships(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category TEXT,
  status TEXT CHECK (status IN ('idea', 'purchased', 'given')) DEFAULT 'idea',
  occasion TEXT,
  custom_occasion TEXT,
  photos TEXT[],
  tags TEXT[],
  date_added TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  date_purchased TIMESTAMP WITH TIME ZONE,
  date_given TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anniversaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.occasions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gift_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for relationships
CREATE POLICY "Users can view their own relationships" ON public.relationships
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own relationships" ON public.relationships
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own relationships" ON public.relationships
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own relationships" ON public.relationships
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for anniversaries
CREATE POLICY "Users can view anniversaries of their relationships" ON public.anniversaries
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.relationships 
    WHERE relationships.id = anniversaries.relationship_id 
    AND relationships.user_id = auth.uid()
  ));

CREATE POLICY "Users can create anniversaries for their relationships" ON public.anniversaries
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM public.relationships 
    WHERE relationships.id = anniversaries.relationship_id 
    AND relationships.user_id = auth.uid()
  ));

CREATE POLICY "Users can update anniversaries of their relationships" ON public.anniversaries
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM public.relationships 
    WHERE relationships.id = anniversaries.relationship_id 
    AND relationships.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete anniversaries of their relationships" ON public.anniversaries
  FOR DELETE USING (EXISTS (
    SELECT 1 FROM public.relationships 
    WHERE relationships.id = anniversaries.relationship_id 
    AND relationships.user_id = auth.uid()
  ));

-- RLS Policies for occasions
CREATE POLICY "Users can view their own occasions" ON public.occasions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own occasions" ON public.occasions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own occasions" ON public.occasions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own occasions" ON public.occasions
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for gift_ideas
CREATE POLICY "Users can view their own gift ideas" ON public.gift_ideas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own gift ideas" ON public.gift_ideas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own gift ideas" ON public.gift_ideas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own gift ideas" ON public.gift_ideas
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for gifts
CREATE POLICY "Users can view their own gifts" ON public.gifts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own gifts" ON public.gifts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own gifts" ON public.gifts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own gifts" ON public.gifts
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to automatically create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name');
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_relationships_updated_at
  BEFORE UPDATE ON public.relationships
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();