interface IInputEventAdProps {
  title: string;
  eventDate: string;
  eventLocation: string;
  description: string;
  images: [string] | null;
  eventAddress: string;
  price: string;
  stock: string;

  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setEventDate: React.Dispatch<React.SetStateAction<string>>;
  setEventLocation: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setImages: React.Dispatch<React.SetStateAction<string | null>>;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  setStock: React.Dispatch<React.SetStateAction<string>>;
  setEventAddress: React.Dispatch<React.SetStateAction<string>>;
}

export default IInputEventAdProps;
