import axios from "axios";
axios.defaults.withCredentials = true;

export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export async function payment(product, user = null, orderUser = null) {
  const {
    data: { key },
  } = await axios("http://localhost:8000/api/get-key");
  console.log(key);
  const { data } = await axios.post(
    "http://localhost:8000/api/payment",
    {
      _id: product._id,
    },
    { withCredentials: true }
  );
  var options = {
    key: key, // Enter the Key ID generated from the Dashboard
    amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Shopzilla", //your business name
    description: "Place my order",
    image: "",
    order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    callback_url: `http://localhost:8000/api/payment-verification/${user._id}/${product._id}`,
    prefill: {
      //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
      name: orderUser.name || user.name, //your customer's name
      email: orderUser.email || user.email,
      contact: orderUser.mobile || user.mobile, //Provide the customer's phone number for better conversion rates
    },
    notes: {
      address: user.address,
    },
    theme: {
      color: "#3399cc",
    },
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.open();
}

export async function paymentAll(product, user = null, orderUser = null) {
  const {
    data: { key },
  } = await axios("http://localhost:8000/api/get-key");
  console.log(key);
  const { data } = await axios.post(
    "http://localhost:8000/api/payment",
    {
      _id: product._id,
    },
    { withCredentials: true }
  );
  var options = {
    key: key, // Enter the Key ID generated from the Dashboard
    amount: product.pprice, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Shopzilla", //your business name
    description: "Place my order",
    image: "",
    order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    callback_url: `http://localhost:8000/api/payment-verification/${user._id}/${product._id}`,
    prefill: {
      //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
      name: orderUser.name || user.name, //your customer's name
      email: orderUser.email || user.email,
      contact: orderUser.mobile || user.mobile, //Provide the customer's phone number for better conversion rates
    },
    notes: {
      address: user.address,
    },
    theme: {
      color: "#3399cc",
    },
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.open();
}

// const handleCart = async (id) => {
//   console.log(id);
//   if (isLoggedIn()) {
//     const res = await axios.post(
//       `http://localhost:8000/api/add-to-cart/${id}`,
//       // { index: index - 1 },
//       { withCredentials: true }
//     );
//     if (res.data.status === "success") {
//       toast.success(res.data.message, {
//         duration: 4000,
//         position: "top-center",
//       });
//     } else {
//       toast.error(res.data.message, {
//         duration: 4000,
//         position: "top-center",
//       });
//     }
//   } else {
//     toast.error("Please Login First :-)", {
//       duration: 4000,
//       position: "top-center",
//     });
//   }
// };
