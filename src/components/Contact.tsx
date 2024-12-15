"use client";

import { useRef, useState, ChangeEvent, FormEvent } from "react";
import MagicButton from "./ui/MagicButton";
import { useSendMessageMutation } from "@/redux/api/messagesApi";
import toast from "react-hot-toast";
import { ArrowRight } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  // Use the sendMessage mutation from RTK Query
  const [sendMessage] = useSendMessageMutation();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send the message using RTK Query mutation
      const response = await sendMessage(form).unwrap();
      console.log("response", response);

      toast.success("Message sent successfully!");

      // Reset the form
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Failed to send message:", error);

      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="c-space my-20" id="contact">
      <div className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full bg-transparent">
        <h1 className="heading lg:max-w-[48vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let's discuss how I can help you achieve
          your goals.
        </p>
        <a href="mailto:contact@jsmastery.pro">
          <MagicButton
            title="Let's get in touch"
            icon={<ArrowRight />}
            position="right"
          />
        </a>
      </div>

      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <div className="contact-container">
          <h3 className="head-text">Let&apos;s talk</h3>
          <p className="text-lg text-white-600 mt-3">
            Whether you’re looking to build a new website, improve your existing
            platform, or bring a unique project to life, I&apos;m here to help.
          </p>

          <div className="w-full">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col space-y-7"
            >
              <label className="space-y-3">
                <span className="field-label">Full Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="field-input"
                  placeholder="ex., John Doe"
                />
              </label>

              <label className="space-y-3">
                <span className="field-label">Email address</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="field-input"
                  placeholder="ex., johndoe@gmail.com"
                />
              </label>

              <label className="space-y-3">
                <span className="field-label">Your message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="field-input"
                  placeholder="Share your thoughts or inquiries..."
                />
              </label>

              <button
                className="field-btn border dark:border-white/[0.2] border-black/[0.2] cursor-pointer"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
                {/* <img
                  src="/icons/arrow-up.png"
                  alt="arrow-up"
                  className="field-btn_arrow"
                /> */}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
