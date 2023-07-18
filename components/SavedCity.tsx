import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { ISavedCity } from '@/utils/weatherInterfaces';

interface IProps extends ISavedCity {
  data: ISavedCity;
  onDelete?: (data: ISavedCity) => void;
}

export const SavedCity = ({ data, onDelete }: IProps | any) => {
  const router = useRouter();
  const { data: session }: { data: Session | null } = useSession();
  const pathName = usePathname();

  const handleSearch = () => {
    router.push(`/?search=${encodeURIComponent(data.name)}`);
  };

  return (
    <section className="w-full">
      <div className="prompt_card">
        <div className="flex justify-between items-start gap-5" onClick={handleSearch}>
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {data.name}, {data.country}
              </h3>
            </div>
          </div>
        </div>
        {session?.user?.id === data.creator._id && pathName === '/profile' && (
          <button className="font-inter text-sm text-white mt-5 bg-red-400 rounded-lg w-24" onClick={() => onDelete && onDelete(data)}>
            Delete
          </button>
        )}
      </div>
    </section>
  );
};
