interface MenuItemsProps {
  children: React.ReactNode;
}

function MenuItem({ children }: MenuItemsProps) {
  return (
    <div className="px-4 py-1 font-semibold hover:bg-neutral-100 transition text-black">
      {children}
    </div>
  );
}

export default MenuItem;
