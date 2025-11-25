import { Archive } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { toast, ToastContentProps } from 'react-toastify';


type WithTittleType = ToastContentProps<{
  title: string;
  text: string;
}>
const useToastsOnEvents = (url: string) => {
  const sourceRef = useRef<EventSource | null>(null);

  const WithTittle = ({data}:WithTittleType) => {
    return (
      <div className="flex flex-col w-full">
        <h3 className="text-zinc-800 text-sm font-semibold flex items-center gap-1">
          <Archive className="size-4 text-grey-700" /> {data.title}
        </h3>

        <div className="pl-5 mt-2">
          <p className="text-sm">{data.text}</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const source = new EventSource(url);
    sourceRef.current = source;

    source.onmessage = (e) => {
      const data = JSON.parse(e.data);
      toast(WithTittle, { data: data.message, style: { backgroundColor: '#FEF2F2', fontSize: "14px" } });
    };

    source.onerror = (e) => console.error('SSE client error:', e);
    return () => source.close();
  }, [url]);

  const close = () => sourceRef.current?.close();

  return { close };
};

export default useToastsOnEvents;