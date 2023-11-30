import React from 'react'

const SideBar = () => {
  return (
    <div className="w-[250px]">
      <Navigation
        activeItemId="/users/members"
        onSelect={({ itemId }) => {}}
        items={[
          {
            title: "Dashboard",
            itemId: "/dashboard",

            elemBefore: () => <Icon name="inbox" />,
          },
          {
            title: "Users",
            itemId: "/users",
            elemBefore: () => <Icon name="users" />,
            subNav: [
              {
                title: "User Lists",
                itemId: "/management/userlists",
              },
            ],
          },
        ]}
      />
    </div>
  );
}
export default SideBar
