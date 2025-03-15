import type { NextPage } from 'next';
import Image from "next/image";
import resume_touxiang from "../../public/resume_touxiang.png";

const Informs: NextPage = () => {
	return (
		<div className="w-full h-auto md:h-screen bg-gray-400 flex items-center justify-center">
			<div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col lg:flex-row items-center justify-between py-16 gap-8">
					<div className="w-full lg:w-1/2 space-y-12">
						<div className="space-y-32">
							<div className="text-7xl sm:text-8xl font-semibold blur-xs text-primary">徐禧</div>
							<div className="text-7xl sm:text-8xl font-semibold text-black -mt-24">Hugh·Aix</div>
						</div>
						
						<div className="space-y-4">
							<Image 
								className="w-24 h-auto" 
								width={94} 
								height={72} 
								alt="联系方式图标" 
								src="Vector.svg"
							/>
							<div className="space-y-2">
								<h2 className="text-xl font-semibold text-primary">联系方式</h2>
								<p className="text-xl font-semibold text-primary">电话：15221094990</p>
								<p className="text-xl font-semibold text-primary">电子邮箱：1850786422@qq.com</p>
							</div>
						</div>
					</div>

					<div className="w-full lg:w-1/2">
						<Image 
							className="w-full h-auto object-cover" 
							width={901} 
							height={1024} 
							alt="个人照片" 
							src={resume_touxiang}
							priority
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Informs;
