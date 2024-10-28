// import { UsersAPI } from "@/apis";

export const UsersProfilePageLoader = () => {
    // const response = await UsersAPI.getList();
    // return response || [];
    return {
      name: "Jese Leos",
      jobTitle: "Front-end Developer",
      location: "San Francisco, USA",
      email: "yourname@flowbite.com",
      address: "92 Miles Drive, Newark, NJ 07103, California, United States of America",
      phone: "+00 123 456 789 / +12 345 678",
      imageSrc: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
      
      aboutMe: `
        <p>Tincidunt quam neque in cursus viverra orci, <strong>dapibus nec tristique</strong>.</p>
        <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet.</p>
      `,
      education: 'Thomas Jeff High School, Stanford University',
      workHistory: ['Twitch', 'Google', 'Apple'],
      languages: ['English', 'German', 'Italian', 'Spanish'],
      organization: 'Themesberg LLC',
      role: 'Graphic Designer',
      department: 'Marketing',
      joinDate: '12-09-2021',  // Adjust format as necessary
      birthday: '15-08-1990'
    }
};
