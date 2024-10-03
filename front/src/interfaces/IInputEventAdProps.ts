interface IInputEventAdProps {
  title: string;
  eventDate: string;
  eventLocation: string;
  description: string;
  images: [string] | null;
  price: number | 0;
  stock: number | 0;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setEventDate: React.Dispatch<React.SetStateAction<string>>;
  setEventLocation: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setImages: React.Dispatch<React.SetStateAction<string | null>>;
  setPrice: React.Dispatch<React.SetStateAction<string | null>>;
  setStock: React.Dispatch<React.SetStateAction<string | null>>;
}

export default IInputEventAdProps;
