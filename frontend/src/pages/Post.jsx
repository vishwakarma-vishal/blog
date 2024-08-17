import { FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineInsertComment } from "react-icons/md";
import { Sidebar } from "../components/sidebar/Sidebar";

const Post = () => {
    return (
        <div className="flex gap-6">
            <div className="space-y-2 basis-2/3">
                <div>
                    <img src="./src/assets/placeholder.jpg" alt="hero" className="w-full h-[450px] rounded" />
                </div>

                <div className="space-y-2">
                    <div className="flex gap-3 text-md text-gray-600">
                        <span className="flex items-center gap-1"><FaRegPenToSquare /> Vishal Vishwakarma</span>
                        <span className="flex items-center gap-[1px]"><MdOutlineInsertComment /> 13</span>
                    </div>

                    <h2 className="text-3xl font-semibold text-gray-800">This is the heading of this post</h2>
                    <p className="text-md">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam reprehenderit voluptatem expedita nisi pariatur aspernatur. Voluptate fuga ad eius aut deleniti, esse provident et ullam? Sint blanditiis necessitatibus quas accusamus?
                        Dolor impedit dignissimos, aperiam tempore mollitia nam, iure harum vero suscipit rerum quis. Repellat rerum, voluptas aliquam nemo eum eveniet maxime voluptate alias, tempore cum enim ullam consectetur facere consequuntur.
                        Neque suscipit optio, veniam veritatis aliquam ex recusandae nam, sed officiis molestiae eum sunt! Totam, debitis, deserunt consequuntur beatae earum iure rerum aliquid exercitationem, iusto atque eveniet laborum eos nihil.
                        Laborum non obcaecati veritatis repudiandae tempora placeat harum provident tenetur dolores, eveniet pariatur ducimus animi! Nesciunt amet dolore, illum assumenda rem distinctio eos numquam hic fugit, voluptatum, inventore aliquam repellat?
                        Modi blanditiis molestiae ad quis reprehenderit cupiditate corrupti delectus quia atque quae. Corporis, consequuntur id veniam nostrum rerum numquam quia voluptatem nulla ullam officia dolorum corrupti, iusto voluptate nam laudantium!
                        Excepturi nihil rem quod asperiores facere nisi voluptatem ullam rerum exercitationem? Quisquam voluptate earum veritatis aut nulla, voluptas rerum architecto atque ipsa? Necessitatibus dolores omnis velit labore repellendus. Aspernatur, recusandae.
                        Earum soluta aliquid minima officiis iure iusto illum, quod similique quas numquam eius tempore aspernatur facere quasi ullam hic eum delectus doloremque ut iste molestiae. Dolorem veniam dolores consequuntur reprehenderit.
                        Consectetur optio at vero, error tempora totam voluptate, dicta asperiores atque quidem, eligendi dolor quisquam soluta blanditiis quod sint assumenda eum. Officiis consectetur, voluptatibus ipsum totam ratione ipsam nostrum commodi.
                        Veniam neque quas quibusdam sit cupiditate iste, nobis quae expedita excepturi autem repellendus non laboriosam nulla numquam eos sunt. Perspiciatis quidem iure et earum! Sit perferendis ratione voluptas a tempore?
                        Non repellat voluptate unde, eveniet corrupti alias, placeat voluptatibus blanditiis doloribus, enim sed? Ad velit vitae id aut, eligendi corrupti ut dignissimos, soluta necessitatibus cumque magnam natus laboriosam eveniet illum?</p>
                </div>
            </div>

            <Sidebar/>
        </div>
    )
}

export default Post;