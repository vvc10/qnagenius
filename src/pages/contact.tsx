import React from 'react'

const Contact = () => {
  return (
    <div>
           {/* Content */}
           <div className="px-2 py-6 w-full mx-auto">

<main className="container py-6">
  <div className="flex flex-col gap-6">

    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-semibold">written by {author}</h2>
            <p className="text-sm text-gray-500">Last updated - {lastUpdated}</p>
          </div>
        </div>
      </div>


      <div className="flex space-x-4 mb-5">
        <Button variant="outline" size="sm"><Star className="mr-2 h-4 w-4" /> 42</Button>
        <Button variant="outline" size="sm"><Heart className="mr-2 h-4 w-4" /> 156</Button>
        <Button variant="outline" size="sm"><BookOpen className="mr-2 h-4 w-4" /> 10k</Button>
        <Button variant="outline" size="sm"><MessageSquare className="mr-2 h-4 w-4" /> 23</Button>
        <Button variant="outline" size="sm"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
      </div>

      <Card>
        <CardContent className="p-4">

          <ScrollArea className="relative w-full overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4 p-1">
              <Image
                src={image} // Fixed path handling
                alt="Gallery image"
                width={600}
                height={400}
                className="w-full rounded-[10px] h-auto object-cover"
              />
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Project Description */}
      <p className="mb-8 mt-2" id="intro">
        {description}
      </p>
    </div>

    {/* Project Steps */}
    <div className="grid gap-6">
      {projects.map((project) => (
        <div key={project.id}>
          {/* Components */}
          <Card id="components">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </span>
                Components needed
              </CardTitle>
            </CardHeader>
            <CardContent>
              {project.components}
            </CardContent>
          </Card>

          {/* Circuit */}
          <Card id="circuit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </span>
                Circuit Assembly
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Image
                  src={project.circuit ? `/images/${project.circuit}` : "/placeholder.svg"} // Fixed path handling
                  alt="Circuit diagram"
                  width={800}
                  height={400}
                  className="rounded-lg border mx-auto"
                />
                <p className="text-muted-foreground">
                  {project.about_circuit}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Programming */}
          <Card id="programming">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </span>
                Programming
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="code" className="w-full">
                <TabsList>
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <TabsTrigger value="explanation">Explanation</TabsTrigger>
                </TabsList>
                <TabsContent value="code">
                  <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                    <code>{project.programming}</code>
                  </pre>
                </TabsContent>
                <TabsContent value="explanation">
                  <p className="text-muted-foreground">
                    {project.about_programming}
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Final Assembly */}
          <Card id="conclusion">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  4
                </span>
                Conclusion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Image
                    src={project.conclusion_images ? `/images/${project.conclusion_images}` : "/placeholder.svg"} // Fixed path handling
                    alt="Assembly step 1"
                    width={400}
                    height={300}
                    className="rounded-lg border"
                  />
                  <Image
                    src="/placeholder.svg"
                    alt="Assembly step 2"
                    width={400}
                    height={300}
                    className="rounded-lg border"
                  />
                </div>
                <ol className="list-decimal pl-6 space-y-2">
                  {project.conclusion}
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  </div>
</main>
</div>

    </div>
  )
}

export default Contact
