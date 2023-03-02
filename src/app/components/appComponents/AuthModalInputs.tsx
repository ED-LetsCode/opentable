import React from "react";

interface Props {
  inputs: {
    firstname: string;
    lastname: string;
    email: string;
    city: string;
    password: string;
    phone: string;
  };
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignin: boolean;
}

export default function AuthModalInputs({
  inputs,
  handleChangeInput,
  isSignin,
}: Props) {
  return (
    <div>
      {!isSignin && (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="First Name"
            value={inputs.firstname}
            onChange={handleChangeInput}
            name="firstname"
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Last Name"
            value={inputs.lastname}
            onChange={handleChangeInput}
            name="lastname"
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="email"
          className="border rounded p-2 py-3 w-full"
          placeholder="opentable@hotmail.com"
          value={inputs.email}
          onChange={handleChangeInput}
          name="email"
        />
      </div>
      {!isSignin && (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Phone"
            value={inputs.phone}
            onChange={handleChangeInput}
            name="phone"
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="City"
            value={inputs.city}
            onChange={handleChangeInput}
            name="city"
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border rounded p-2 py-3 w-full"
          placeholder="password"
          value={inputs.password}
          onChange={handleChangeInput}
          name="password"
        />
      </div>
    </div>
  );
}
