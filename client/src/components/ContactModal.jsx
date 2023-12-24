const ContactModal = ({data, functions}) => {
  const { phone } = data;
//   console.log(data)
  return (
    <>
      <div
        className="bg-slate-700/50 h-screen w-screen z-10 fixed top-0 left-0 overflow-y-hidden"
      >
        <div className="flex flex-col h-full justify-center items-center">
          <div
            style={{ marginTop: "-200px" }}
            className="h-1/5 w-1/3 bg-white rounded p-5"
          >
            <div className="flex h-full flex-col justify-between">
              <h2>Phone no. {phone}</h2>
              <div className="flex gap-4 self-end">
                <button className="bg-blue-500 text-white text-sm p-3 py-1 rounded">
                  Save
                </button>
                <button onClick={() => {
                    functions.setModalData(undefined);
                    functions.setModalOpen(false);
                }}
                 className="bg-red-500 text-white text-sm py-1 p-3 rounded">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactModal;
