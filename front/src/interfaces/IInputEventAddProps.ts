export default interface IInputEventAdProps {
    title: string;
    eventDate: string;
    eventLocation: string;
    eventAddress: string;
    description: string;
    stock: string;
    price: string;
    images: string[];
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setEventDate: React.Dispatch<React.SetStateAction<string>>;
    setEventLocation: React.Dispatch<React.SetStateAction<string>>;
    setEventAddress: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setImages: React.Dispatch<React.SetStateAction<string[]>>;
    setStock: React.Dispatch<React.SetStateAction<string>>;
    setPrice: React.Dispatch<React.SetStateAction<string>>;
  }